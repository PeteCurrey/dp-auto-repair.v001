import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface QuoteData {
  quote_number: string;
  title: string;
  description?: string;
  client: {
    business_name?: string;
    contact_person?: string;
    email: string;
    phone?: string;
    address?: string;
  };
  vehicle?: {
    registration: string;
    make: string;
    model: string;
    year: number;
  };
  items: Array<{
    item_type: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  valid_until?: string;
  notes?: string;
  created_at: string;
}

interface InvoiceData {
  invoice_number: string;
  title: string;
  description?: string;
  client: {
    business_name?: string;
    contact_person?: string;
    email: string;
    phone?: string;
    address?: string;
  };
  vehicle?: {
    registration: string;
    make: string;
    model: string;
    year: number;
  };
  items: Array<{
    item_type: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  amount_due: number;
  due_date?: string;
  notes?: string;
  created_at: string;
  status: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const createPDFTemplate = (data: QuoteData | InvoiceData, type: 'quote' | 'invoice') => {
  const isInvoice = type === 'invoice';
  const invoiceData = isInvoice ? data as InvoiceData : null;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; color: #333;">
      <!-- Header -->
      <div style="border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="color: #2563eb; font-size: 36px; margin: 0; font-weight: bold;">DP AUTO</h1>
            <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Professional Automotive Services</p>
          </div>
          <div style="text-align: right;">
            <h2 style="color: #2563eb; font-size: 24px; margin: 0; font-weight: bold;">
              ${isInvoice ? 'INVOICE' : 'QUOTE'}
            </h2>
            <p style="font-size: 18px; font-weight: bold; margin: 5px 0 0 0; color: #1e293b;">
              ${isInvoice ? invoiceData?.invoice_number : (data as QuoteData).quote_number}
            </p>
          </div>
        </div>
      </div>

      <!-- Company Info and Client Info -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div style="width: 45%;">
          <h3 style="color: #2563eb; margin-bottom: 10px; font-size: 16px;">From:</h3>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; font-weight: bold; font-size: 16px;">DP Auto</p>
            <p style="margin: 5px 0; color: #64748b;">Unit 123, Industrial Estate</p>
            <p style="margin: 5px 0; color: #64748b;">Chesterfield, S40 2XX</p>
            <p style="margin: 5px 0; color: #64748b;">Phone: 01234 567890</p>
            <p style="margin: 5px 0; color: #64748b;">Email: info@dpauto.co.uk</p>
          </div>
        </div>
        
        <div style="width: 45%;">
          <h3 style="color: #2563eb; margin-bottom: 10px; font-size: 16px;">To:</h3>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #64748b;">
            <p style="margin: 0; font-weight: bold; font-size: 16px;">
              ${data.client.business_name || data.client.contact_person || 'Client'}
            </p>
            ${data.client.contact_person && data.client.business_name ? 
              `<p style="margin: 5px 0; color: #64748b;">${data.client.contact_person}</p>` : ''
            }
            <p style="margin: 5px 0; color: #64748b;">${data.client.email}</p>
            ${data.client.phone ? `<p style="margin: 5px 0; color: #64748b;">${data.client.phone}</p>` : ''}
            ${data.client.address ? `<p style="margin: 5px 0; color: #64748b;">${data.client.address}</p>` : ''}
          </div>
        </div>
      </div>

      <!-- Vehicle Info -->
      ${data.vehicle ? `
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #2563eb; margin-bottom: 10px; font-size: 16px;">Vehicle Details:</h3>
          <p style="margin: 5px 0; font-weight: bold;">${data.vehicle.registration} - ${data.vehicle.make} ${data.vehicle.model} (${data.vehicle.year})</p>
        </div>
      ` : ''}

      <!-- Quote/Invoice Details -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h3 style="color: #2563eb; margin-bottom: 10px; font-size: 16px;">${isInvoice ? 'Invoice' : 'Quote'} Details:</h3>
          <p style="margin: 5px 0;"><strong>Title:</strong> ${data.title}</p>
          ${data.description ? `<p style="margin: 5px 0;"><strong>Description:</strong> ${data.description}</p>` : ''}
          <p style="margin: 5px 0;"><strong>Date:</strong> ${formatDate(data.created_at)}</p>
          ${isInvoice && invoiceData?.due_date ? 
            `<p style="margin: 5px 0;"><strong>Due Date:</strong> ${formatDate(invoiceData.due_date)}</p>` : ''
          }
          ${!isInvoice && (data as QuoteData).valid_until ? 
            `<p style="margin: 5px 0;"><strong>Valid Until:</strong> ${formatDate((data as QuoteData).valid_until!)}</p>` : ''
          }
        </div>
        
        ${isInvoice ? `
          <div>
            <h3 style="color: #2563eb; margin-bottom: 10px; font-size: 16px;">Status:</h3>
            <p style="padding: 8px 16px; background: ${
              invoiceData?.status === 'paid' ? '#dcfce7' : 
              invoiceData?.status === 'overdue' ? '#fee2e2' : '#fef3c7'
            }; color: ${
              invoiceData?.status === 'paid' ? '#166534' : 
              invoiceData?.status === 'overdue' ? '#991b1b' : '#92400e'
            }; border-radius: 4px; font-weight: bold; text-transform: uppercase;">
              ${invoiceData?.status}
            </p>
          </div>
        ` : ''}
      </div>

      <!-- Items Table -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2563eb; margin-bottom: 15px; font-size: 16px;">Items:</h3>
        <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: #2563eb; color: white;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Type</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Description</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Qty</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Unit Price</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map((item, index) => `
              <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'};">
                <td style="padding: 12px; border: 1px solid #ddd; text-transform: capitalize;">${item.item_type}</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${item.description}</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">${formatCurrency(item.unit_price)}</td>
                <td style="padding: 12px; text-align: right; border: 1px solid #ddd; font-weight: bold;">${formatCurrency(item.total_price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
        <div style="width: 300px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #64748b;">Subtotal:</span>
              <span style="font-weight: bold;">${formatCurrency(data.subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #64748b;">VAT (${data.tax_rate}%):</span>
              <span style="font-weight: bold;">${formatCurrency(data.tax_amount)}</span>
            </div>
            <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 15px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #2563eb; font-size: 18px; font-weight: bold;">Total:</span>
              <span style="color: #2563eb; font-size: 18px; font-weight: bold;">${formatCurrency(data.total_amount)}</span>
            </div>
            ${isInvoice && invoiceData?.amount_due ? `
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #dc2626; font-size: 16px; font-weight: bold;">Amount Due:</span>
                <span style="color: #dc2626; font-size: 16px; font-weight: bold;">${formatCurrency(invoiceData.amount_due)}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${data.notes ? `
        <div style="background: #fefce8; padding: 15px; border-radius: 8px; border-left: 4px solid #eab308; margin-bottom: 30px;">
          <h3 style="color: #92400e; margin-bottom: 10px; font-size: 16px;">Notes:</h3>
          <p style="margin: 0; color: #92400e;">${data.notes}</p>
        </div>
      ` : ''}

      <!-- Terms -->
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <h3 style="color: #2563eb; margin-bottom: 15px; font-size: 16px;">Terms & Conditions:</h3>
        <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
          ${isInvoice ? `
            <p style="margin: 5px 0;">• Payment is due within 30 days of invoice date</p>
            <p style="margin: 5px 0;">• Late payment charges may apply for overdue accounts</p>
            <p style="margin: 5px 0;">• All work carried out is guaranteed for 12 months or 12,000 miles</p>
          ` : `
            <p style="margin: 5px 0;">• This quote is valid for 30 days from the date shown</p>
            <p style="margin: 5px 0;">• Prices include VAT at the current rate</p>
            <p style="margin: 5px 0;">• Payment terms: 50% deposit required, balance on completion</p>
          `}
          <p style="margin: 5px 0;">• All work is carried out in accordance with manufacturer specifications</p>
          <p style="margin: 5px 0;">• Additional work may be required and will be quoted separately</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px; margin: 0;">
          Thank you for choosing DP Auto for your automotive needs
        </p>
        <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">
          www.dpauto.co.uk | info@dpauto.co.uk | 01234 567890
        </p>
      </div>
    </div>
  `;
};

export const generateQuotePDF = async (data: QuoteData) => {
  const html = createPDFTemplate(data, 'quote');
  
  // Create a temporary div to render the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let position = 0;
    const pageHeight = 297; // A4 height in mm

    // If content is longer than one page, add multiple pages
    while (position < imgHeight) {
      if (position > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        -position,
        imgWidth,
        imgHeight
      );
      
      position += pageHeight;
    }

    // Download the PDF
    pdf.save(`quote-${data.quote_number}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
};

export const generateInvoicePDF = async (data: InvoiceData) => {
  const html = createPDFTemplate(data, 'invoice');
  
  // Create a temporary div to render the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let position = 0;
    const pageHeight = 297; // A4 height in mm

    // If content is longer than one page, add multiple pages
    while (position < imgHeight) {
      if (position > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        -position,
        imgWidth,
        imgHeight
      );
      
      position += pageHeight;
    }

    // Download the PDF
    pdf.save(`invoice-${data.invoice_number}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
};