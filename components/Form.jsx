import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    usn: "",
    semester: "",
    contact: "",
    email: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    totalFees: "",
  });

  const [rows, setRows] = useState([
    { slNo: 1, subjectName: "", subjectCode: "", type: "Exam" },
  ]);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addSubject = () => {
    setRows([
      ...rows,
      {
        slNo: rows.length + 1,
        subjectName: "",
        subjectCode: "",
        type: "Exam",
      },
    ]);
  };

  const removeLastSubject = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const clearAllSubjects = () => {
    setRows([{ slNo: 1, subjectName: "", subjectCode: "", type: "Exam" }]);
  };

  const getTotalFees = () => {
    return parseFloat(formData.totalFees) || 0;
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.course.trim()) errors.push("Course is required");
    if (!formData.usn.trim()) errors.push("USN is required");
    if (!formData.semester.trim()) errors.push("Semester is required");
    if (!formData.contact.trim()) errors.push("Contact is required");
    if (!formData.email.trim()) errors.push("Email is required");

    const hasValidSubject = rows.some(
      (row) => row.subjectName.trim() && row.subjectCode.trim()
    );

    if (!hasValidSubject) {
      errors.push("At least one complete subject entry is required");
    }

    if (!formData.totalFees.trim()) {
      errors.push("Total fees is required");
    }

    return errors;
  };

  const downloadPDF = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      alert("Please fill in all required fields:\n" + errors.join("\n"));
      return;
    }

    setIsGeneratingPDF(true);

    try {
      await generatePrintablePDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const generatePrintablePDF = async () => {
    // Create a printable HTML version and use browser's print functionality
    const printWindow = window.open("", "_blank");

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
     
      <style>
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.4;
          margin: 20px;
          color: #000;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #000;
          padding-bottom: 7px;
        }
        .header h1 { font-size: 16px; margin: 5px 0; }
        .header h2 { font-size: 14px; margin: 3px 0; }
        .header h3 { font-size: 14px; margin: 3px 0; }
        .header h4 { font-size: 12px; margin: 3px 0; color: #666; }
        .header h5 { font-size: 16px; margin: 10px 0; text-decoration: underline; }
        
        .section {
          margin-bottom: 7px;
        }
        .section-title {
          font-size: 14px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 7px;
          text-align:center;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 5px;
        }
        
        .field {
          margin-bottom: 6px;
        }
        .field-label {
          font-weight: bold;
          margin-bottom: 3px;
        }
        .field-value {
          border-bottom: 1px solid #000;
          padding-bottom: 2px;
          min-height: 10px;
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .table th, .table td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        .table th {
          background-color: #f0f0f0;
          font-weight: bold;
          text-align: center;
        }
        .table td:first-child {
          text-align: center;
        }
        
        .totals {
          display:flex;
          justify-content:space-between;
          margin-top: 10px;
          font-weight: bold;
        }
        
        .signatures {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          margin-top: 30px;
        }
        .signature {
          text-align: center;
        }
        .signature-line {
          border-bottom: 1px solid #000;
          height: 40px;
          margin-bottom: 5px;
        }
        
        .print-btn {
          background: #1e40af;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          margin: 20px 0;
        }
        .print-btn:hover {
          background: #1e3a8a;
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="print-btn" onclick="window.close()" style="background: #dc2626;">❌ Close</button>
      </div>
      
      <div class="header">
      <img src="/logo.png" alt="GEC Bidar Logo" style="height:60px; width:60px; margin-bottom:2px;" onerror="this.style.display='none'" />
        <h1>Government of Karnataka</h1>
        <h2>Department of Collegiate & Technical Education</h2>
        <h3>Government Engineering College, Bidar – 585403</h3>
        <h4>VTU Belagavi</h4>
        <h5>APPLICATION FORM FOR EXAMINATION / REVALUATION / PHOTOCOPY</h5>
      </div>

      <div class="section">
        
        <div class="details-grid">
          <div class="field">
            <div class="field-label">Name of Candidate:</div>
            <div class="field-value">${formData.name}</div>
          </div>
          <div class="field">
            <div class="field-label">Course / Branch:</div>
            <div class="field-value">${formData.course}</div>
          </div>
          <div class="field">
            <div class="field-label">USN No:</div>
            <div class="field-value">${formData.usn}</div>
          </div>
          <div class="field">
            <div class="field-label">Semester:</div>
            <div class="field-value">${formData.semester}</div>
          </div>
          <div class="field">
            <div class="field-label">Contact No:</div>
            <div class="field-value">${formData.contact}</div>
          </div>
          <div class="field">
            <div class="field-label">Email ID:</div>
            <div class="field-value">${formData.email}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Subjects Applied for Exam/RV/PC</div>
        <table class="table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Type</th>
              <th>Fee Paid (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
              <tr>
                <td>${row.slNo}</td>
                <td>${row.subjectName}</td>
                <td>${row.subjectCode}</td>
                <td>${row.type}</td>
                <td></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="totals">
          <div>Total Subjects: ${rows.length}</div>
          <div>Total Fees: Rs. ${getTotalFees().toFixed(2)}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Bank Details</div>
        <div class="details-grid">
          <div class="field">
            <div class="field-label">Account Number:</div>
            <div class="field-value">${formData.accountNumber}</div>
          </div>
          <div class="field">
            <div class="field-label">IFSC Code:</div>
            <div class="field-value">${formData.ifscCode}</div>
          </div>
          <div class="field" style="grid-column: 1 / -1;">
            <div class="field-label">Bank Name:</div>
            <div class="field-value">${formData.bankName}</div>
          </div>
        </div>
      </div>

      <div class="signatures">
        <div class="signature">
          <div class="signature-line"></div>
          <div>Candidate Signature</div>
        </div>
        <div class="signature">
          <div class="signature-line"></div>
          <div>HOD Signature</div>
        </div>
      </div>
    </body>
    </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Auto-focus the print window
    printWindow.focus();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      usn: "",
      semester: "",
      contact: "",
      email: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      totalFees: "",
    });
    setRows([{ slNo: 1, subjectName: "", subjectCode: "", type: "Exam" }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Form Content */}
          <div id="form-content" className="p-8">
            {/* Header */}
            <div className="text-center mb-8 pb-4 border-b-2 border-black">
              <h1 className="text-lg font-bold mb-1">
                Government of Karnataka
              </h1>
              <h2 className="text-base font-semibold mb-1">
                Department of Collegiate & Technical Education
              </h2>
              <h3 className="text-base font-semibold mb-1">
                Government Engineering College, Bidar – 585403
              </h3>
              <h4 className="text-sm mb-2 text-gray-600">VTU Belagavi</h4>
              <h5 className="text-lg font-bold underline">
                APPLICATION FORM FOR EXAMINATION / REVALUATION / PHOTOCOPY
              </h5>
            </div>

            {/* Candidate Details */}
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-2 text-blue-800">
                Candidate Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Name of Candidate", "name", "text"],
                  ["Course / Branch", "course", "text"],
                  ["USN No", "usn", "text"],
                  ["Semester", "semester", "text"],
                  ["Contact No", "contact", "tel"],
                  ["Email ID", "email", "email"],
                ].map(([label, field, type]) => (
                  <div key={field} className="relative">
                    <label className="block text-xs font-medium mb-1 text-gray-700">
                      {label}: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={type}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1 text-sm bg-transparent transition-colors"
                      placeholder={`Enter ${label.toLowerCase()}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects Table */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-semibold text-blue-800">
                  Subject Details
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={addSubject}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                  >
                    + Add
                  </button>
                  {rows.length > 1 && (
                    <button
                      onClick={removeLastSubject}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto border border-gray-300 rounded">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-gray-300 p-2 text-xs font-semibold text-center">
                        Sl. No
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-semibold">
                        Subject Name
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-semibold">
                        Subject Code
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-semibold">
                        Type
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-semibold">
                        Fee Paid (Rs.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border border-gray-300 p-1 text-center font-medium text-xs">
                          {row.slNo}
                        </td>
                        <td className="border border-gray-300 p-1">
                          <input
                            type="text"
                            value={row.subjectName}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "subjectName",
                                e.target.value
                              )
                            }
                            className="w-full focus:outline-none text-xs bg-transparent"
                            placeholder="Enter subject name"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <input
                            type="text"
                            value={row.subjectCode}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "subjectCode",
                                e.target.value
                              )
                            }
                            className="w-full focus:outline-none text-xs bg-transparent"
                            placeholder="Code"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <select
                            value={row.type}
                            onChange={(e) =>
                              handleRowChange(index, "type", e.target.value)
                            }
                            className="w-full focus:outline-none text-xs bg-transparent"
                          >
                            <option value="Exam">Exam</option>
                            <option value="Revaluation">Revaluation</option>
                            <option value="Photocopy">Photocopy</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 p-1">
                          <span className="text-xs text-gray-400">-</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Summary */}
              <div className="mt-2 p-2 bg-blue-50 rounded">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-medium">Total Subjects: </span>
                    <span className="font-bold text-blue-800">
                      {rows.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Total Fees: Rs.</span>
                    <input
                      type="number"
                      name="totalFees"
                      value={formData.totalFees}
                      onChange={handleInputChange}
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-xs font-bold text-green-700 focus:outline-none focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-2 text-blue-800">
                Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ["Account Number", "accountNumber", "text"],
                  ["IFSC Code", "ifscCode", "text"],
                  ["Bank Name", "bankName", "text"],
                ].map(([label, field, type]) => (
                  <div key={field} className="relative">
                    <label className="block text-xs font-medium mb-1 text-gray-700">
                      {label}:
                    </label>
                    <input
                      type={type}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1 text-sm bg-transparent transition-colors"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="text-center">
                <div className="h-8 border-b border-black mb-1"></div>
                <p className="text-xs font-medium">Candidate Signature</p>
              </div>
              <div className="text-center">
                <div className="h-8 border-b border-black mb-1"></div>
                <p className="text-xs font-medium">HOD Signature</p>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-gray-100 p-4 border-t">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={clearAllSubjects}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors text-sm"
              >
                Clear Subjects
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium transition-colors text-sm"
              >
                Reset Form
              </button>
              <button
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className={`px-6 py-2 rounded font-semibold transition-colors text-white text-sm ${
                  isGeneratingPDF
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isGeneratingPDF ? "Generating..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
