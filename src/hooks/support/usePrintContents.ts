import { useRef } from 'react';

export const usePrintContents = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML as string;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = `<div className ={Column}>${printContents}</div>`;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return { printRef, handlePrint };
};
