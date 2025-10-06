import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";

const GeographicalDistribution = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
            const response = await api.get("/api/v1/user/geographical-distribution");
            setReportData(response.data);
            
             } catch (err) {
            console.error("Failed to fetch report:", err);
            }

    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Company Reports</h1>
      <p>Geographical distribution of users:</p>
      <ul>
        {reportData.map((item) => (
          <li key={item.country}>
            {item._id}: {item.count} users
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeographicalDistribution;
