import React from 'react';
import './ReportsLayout.css'; // Assuming you will add the CSS in this file

const ReportLayout = () => {

    const reportUrl = 'https://images.template.net/wp-content/uploads/2019/08/Sample-Hospital-Project-Report-in-PDF.jpg';

    const viewReport = () => {
        window.open(reportUrl, '_blank');
    };

    const downloadReport = () => {
        // Triggering download
        const link = document.createElement('a');
        link.href = reportUrl;
        link.download = 'Hospital-Project-Report.pdf'; // You can specify the file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Sample data for the reports
    const reports = [
        { serial: 1, doctorName: 'Dr. John Doe', specialty: 'Cardiology' },
        { serial: 2, doctorName: 'Dr. Jane Smith', specialty: 'Dermatology' },
        // Add more report data here
    ];

    return (
        <div className="report-container">
            <h2>Reports</h2>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.serial}</td>
                            <td>{report.doctorName}</td>
                            <td>{report.specialty}</td>
                            <td>
                                <button className="btn-view" onClick={viewReport}>View Report</button>
                            </td>
                            <td>
                                <button className="btn-download" onClick={downloadReport}>Download Report</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportLayout;
