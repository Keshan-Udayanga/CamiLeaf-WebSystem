import React, { useEffect, useState } from "react";

const ResourceTablePage = () => {
  const [resources, setResources] = useState([]);

  // Example: fetch resource data from backend or local storage
  useEffect(() => {
    // Dummy data for demonstration
    const dummyData = [
      { resourceId: "R001", resourceType: "Paper", quantity: 100, unitOfMeasure: "Units", receivedDate: "2025-09-22" },
      { resourceId: "R002", resourceType: "Milk", quantity: 50, unitOfMeasure: "Liters", receivedDate: "2025-09-20" },
      { resourceId: "R003", resourceType: "Rice", quantity: 200, unitOfMeasure: "Kg", receivedDate: "2025-09-21" },
    ];
    setResources(dummyData);
  }, []);

  return (
    <div className="table-wrapper">
      <h2>Resource Stock Table</h2>
      <table>
        <thead>
          <tr>
            <th>Resource ID</th>
            <th>Resource Type</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Received Date</th>
          </tr>
        </thead>
        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td colSpan="5">No resources found.</td>
            </tr>
          ) : (
            resources.map((res, index) => (
              <tr key={index}>
                <td>{res.resourceId}</td>
                <td>{res.resourceType}</td>
                <td>{res.quantity}</td>
                <td>{res.unitOfMeasure}</td>
                <td>{res.receivedDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTablePage;
