import React from 'react';

interface Invoice {
  invoice_number: string;
  client_name: string;
  client_address: string;
  item: string;
  total_amount: number;
  due_date: string;
}

interface InvoiceFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  newInvoice: Partial<Invoice>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, onCancel, onChange, newInvoice }) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>
            Invoice Number:
            <input
              type="text"
              name="invoice_number"
              value={newInvoice.invoice_number}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Client Name:
            <input
              type="text"
              name="client_name"
              value={newInvoice.client_name}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>
            Client Address:
            <input
              type="text"
              name="client_address"
              value={newInvoice.client_address}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            item:
            <input
              type="text"
              name="item"
              value={newInvoice.item}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>
            Total Amount:
            <input
              type="number"
              name="total_amount"
              value={newInvoice.total_amount}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Due Date:
            <input
              type="date"
              name="due_date"
              value={newInvoice.due_date}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </label>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <button
          type="button"
          onClick={onCancel}
          style={buttonStyle}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: '#2563eb' }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '4px',
  marginBottom: '10px',
  border: '1px solid #444',
  borderRadius: '4px',
  backgroundColor: '#111827',
  color: '#d1d5db',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#ccc',
  color: '#000',
  border: 'none',
  borderRadius: '4px',
  marginRight: '10px',
};

export default InvoiceForm;
