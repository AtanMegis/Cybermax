import type { Task } from '@/types/task';
import jsPDF from 'jspdf';

export const generateTasksPDF = (tasks: Task[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  //? Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Task Management Report', margin, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleString()}`, margin, yPos);
  doc.text('Task Manager App', pageWidth - margin, yPos, { align: 'right' });

  //? Summary
  yPos += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Summary', margin, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Tasks: ${totalCount}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`Completed: ${completedCount}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`Pending: ${totalCount - completedCount}`, margin + 5, yPos);

  //? Tasks
  yPos += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Tasks', margin, yPos);

  yPos += 10;

  tasks.forEach((task) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const status = task.completed ? '[✓]' : '[ ]';
    doc.text(`${status} ${task.title}`, margin + 5, yPos);

    yPos += 6;

    if (task.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80);
      const splitDesc = doc.splitTextToSize(task.description, pageWidth - margin * 2 - 10);
      doc.text(splitDesc, margin + 5, yPos);
      yPos += splitDesc.length * 5;
    }

    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Created: ${new Date(task.createdAt).toLocaleDateString()}`, margin + 5, yPos);

    yPos += 10;
    doc.setTextColor(0);
  });

  doc.save(`tasks-report-${Date.now()}.pdf`);
};