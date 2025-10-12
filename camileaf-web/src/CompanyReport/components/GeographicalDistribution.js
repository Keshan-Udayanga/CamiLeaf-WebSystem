import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const GeographicalDistribution = () => {
  const [reportData, setReportData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); 
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/v1/user/geographical-distribution`, {
        params: { month, year },
      });
      setReportData(
        response.data.map((item) => ({
          country: item._id || "Unknown",
          users: item.count,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch report:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
  try {
    const response = await api.get("/api/v1/user/generate-geographical-report", {
      responseType: "blob",
      params: { month: month, year: year }
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Geographical_Report.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error("Error generating report:", err);
  }
  };


  useEffect(() => {
    fetchData();
  }, [month, year]);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F9FAFB", borderRadius: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#2E8B57", margin: 0 }}>Geographical Distribution</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <FormControl size="small" sx={{ minWidth: 120, backgroundColor: "white" }}>
            <InputLabel>Month</InputLabel>
            <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month">
              {months.map((m, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 100, backgroundColor: "white" }}>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<PictureAsPdfIcon />}
            sx={{
              backgroundColor: "#2E8B57",
              "&:hover": { backgroundColor: "#27664E" },
            }}
            onClick={handleDownloadReport}
          >
            Generate PDF Report
          </Button>
        </div>
      </div>

      <p style={{ color: "#4B5563" }}>
        User distribution by country for <b>{months[month - 1]} {year}</b>.
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={reportData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3CA374" />
              <stop offset="100%" stopColor="#2E8B57" />
            </linearGradient>
          </defs>
          <Bar dataKey="users" fill="url(#barColor)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {loading && <p style={{ textAlign: "center" }}>Loading data...</p>}
    </div>
  );
};

export default GeographicalDistribution;
