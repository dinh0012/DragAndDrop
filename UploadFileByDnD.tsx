import * as React from 'react';
import DragAndDrop from './DragAndDrop';
import { doUploadFile } from 'common/utils';
interface Props {
  children: React.ReactElement;
  className?: string;
  folder: any;
  uploadFile(p, cb): void;
}
const UploadFileByDnD = (props: Props) => {
  const { children, className = '', uploadFile, folder } = props;

  const handleDrop = (event) => {
    const fileDrag = event.dataTransfer.files;
    const file = fileDrag && fileDrag ? fileDrag[0] : {};
    doUploadFile(file, folder, uploadFile);
  };

  const handleDrag = (e) => {
    const items = e.dataTransfer.items;
    return folder.id && items && items.length && items[0].kind === 'file';
  };

  return (
    <DragAndDrop
      txtDrag="Drop file to upload"
      className={className}
      onDrop={handleDrop}
      onDrag={handleDrag}
    >
      {children}
    </DragAndDrop>
  );
};

export default UploadFileByDnD;
