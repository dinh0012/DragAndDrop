import * as React from 'react';
import * as css from './DragAndDrop.scss';
interface Props {
  children: React.ReactElement;
  className?: string;
  txtDrag?: string;
  onDrop(e): void;
  onDrag?(e): boolean;
}
let dragEventCounter = 0; // drop over child element

const DragAndDrop = (props: Props) => {
  const { children, className = '', txtDrag = '', onDrop, onDrag } = props;
  const [ dragIn, setDragIn ] = React.useState(false);
  const handleDragIn = (event) => {
    overrideEventDefaults(event);
    if (onDrag && !onDrag({ ...event })) {
      return;
    }
    dragEventCounter = dragEventCounter + 1;
    if (
      !dragIn &&
      (event.dataTransfer.items && event.dataTransfer.items.length > 0)
    ) {
      setDragIn(true);
    }
  };

  const handleDragOut = (event) => {
    overrideEventDefaults(event);
    if (onDrag && !onDrag({ ...event })) {
      return;
    }
    dragEventCounter = dragEventCounter - 1;
    if (dragEventCounter > 0) return;
    dragEventCounter === 0 && setDragIn(false);
  };
  const overrideEventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDrop = (event) => {
    overrideEventDefaults(event);
    dragEventCounter = 0;
    setDragIn(false);
    onDrop({ ...event });
    event.dataTransfer.clearData();
  };
  return (
    <div
      className={`${css.UploadDnD} ${className} ${dragIn ? 'dragging' : ''}`}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      onDragOver={overrideEventDefaults}
      onDragEnter={handleDragIn}
    >
      {children}
      {dragIn && (
        <div className="drag-in">
          <span>{txtDrag}</span>
        </div>
      )}
    </div>
  );
};
export default DragAndDrop;
