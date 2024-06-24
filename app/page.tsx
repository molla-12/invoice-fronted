 "use client";
import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm'; 
import { CSVLink } from 'react-csv';

interface Invoice {
  id: number;
  invoice_number: string;
  client_name: string;
  client_address: string;
  item: string;
  total_amount: number;
  due_date: string;
}

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    invoice_number: '',
    client_name: '',
    client_address: '',
    item: '',
    total_amount: 0,
    due_date: '',
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('https://invoice-backend-theta.vercel.app/api/invoice');
        if (response.ok) {
          const data: Invoice[] = await response.json();
          setInvoices(data);
        } else {
          console.error('Failed to fetch invoices');
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, []);

  const handleAddInvoice = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://invoice-backend-theta.vercel.app/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoice),
      });
      
      if (response.ok) {
        const savedInvoice: Invoice = await response.json();
        setInvoices((prev) => [...prev, savedInvoice]);
        setShowModal(false);
        setNewInvoice({
          invoice_number: '',
          client_name: '',
          client_address: '',
          item: '',
          total_amount: 0,
          due_date: '',
        });
      } else {
        const errorMessage = await response.text(); 
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
  };

  const headers = [
    { label: 'Invoice Number', key: 'invoice_number' },
    { label: 'Client Name', key: 'client_name' },
    { label: 'Client Address', key: 'client_address' },
    { label: 'item', key: 'item' },
    { label: 'Total Amount', key: 'total_amount' },
    { label: 'Due Date', key: 'due_date' },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-gray-200">
      <h1 className="text-4xl mb-8">Invoice Management System</h1>
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #444',
          borderRadius: '8px',
          backgroundColor: '#1f2937',
          color: '#d1d5db',
        }}
      >
        <h2 className="text-2xl mb-4">Invoice List</h2>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={handleAddInvoice}
            style={{
              marginRight: '10px',
              padding: '10px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Add Invoice
          </button>
          <CSVLink
            data={invoices}
            headers={headers}
            filename={"invoices.csv"}
            style={{
              padding: '10px',
              backgroundColor: '#2caeba',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              textDecoration: 'none',
            }}
          >
            Export CSV
          </CSVLink>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid #444',
                  padding: '8px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                }}
              >
                Invoice Number
              </th>
              <th
                style={{
                  border: '1px solid #444',
                  padding: '8px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                }}
              >
                Client Name
              </th>
              <th
                style={{
                  border: '1px solid #444',
                  padding: '8px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                }}
              >
                Client Address
              </th>
              <th
                style={{
                  border: '1px solid #444',
                  padding: '8px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                }}
              >
                item Name
              </th>
              <th
                style={{
                  border: '1px solid #444',
                  padding: '8px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                }}
              >
                Total Amount
              </th>
              <th
                style={{
                  border: '1px solid #444',
                  padding: '8px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                }}
              >
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td style={{ border: '1px solid #444', padding: '8px' }}>{invoice.invoice_number}</td>
                <td style={{ border: '1px solid #444', padding: '8px' }}>{invoice.client_name}</td>
                <td style={{ border: '1px solid #444', padding: '8px' }}>{invoice.client_address}</td>
                <td style={{ border: '1px solid #444', padding: '8px' }}>{invoice.item}</td>
                <td style={{ border: '1px solid #444', padding: '8px' }}>{invoice.total_amount}</td>
                <td style={{ border: '1px solid #444', padding: '8px' }}>{invoice.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1f2937',
            color: '#d1d5db',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            borderRadius: '8px',
          }}
        >
          <h2 className="text-xl mb-4">Add New Invoice</h2>
          <InvoiceForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onChange={handleInputChange}
            newInvoice={newInvoice}
          />
        </div>
      )}

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </main>
  );
};

export default Home;
