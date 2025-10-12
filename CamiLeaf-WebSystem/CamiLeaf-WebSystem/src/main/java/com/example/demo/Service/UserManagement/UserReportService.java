package com.example.demo.Service.UserManagement;

import com.example.demo.DTO.CountryUserCount;
import com.example.demo.Repo.UserManagement.UserRepository;
import com.lowagie.text.Document;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.Chunk;
import com.lowagie.text.Element;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;

@Service
public class UserReportService {

    private final UserRepository userRepository;

    public UserReportService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Existing method
    public List<CountryUserCount> getGeographicalDistribution(Integer month, Integer year) {
        if (month != null && year != null) {
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.YEAR, year);
            cal.set(Calendar.MONTH, month - 1);
            cal.set(Calendar.DAY_OF_MONTH, 1);
            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            Date startDate = cal.getTime();

            cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
            cal.set(Calendar.HOUR_OF_DAY, 23);
            cal.set(Calendar.MINUTE, 59);
            cal.set(Calendar.SECOND, 59);
            Date endDate = cal.getTime();

            return userRepository.countUsersByCountryWithinDateRange(startDate, endDate);
        } else {
            return userRepository.countUsersByCountry();
        }
    }


    public ByteArrayInputStream generateGeographicalReport(List<CountryUserCount> data,
                                                           String companyName,
                                                           String address,
                                                           String contact,
                                                           String email) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // --- Company Header ---
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
            Font smallFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10);


            Paragraph companyInfo = new Paragraph(
                    companyName + "\n" +
                            address + "\n" +
                            "Contact: " + contact + " | Email: " + email,
                    normalFont
            );
            companyInfo.setAlignment(Element.ALIGN_CENTER);
            document.add(companyInfo);

            document.add(Chunk.NEWLINE);

            // --- Report Title ---
            Paragraph title = new Paragraph("Geographical Distribution Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(Chunk.NEWLINE);

            // --- Date and Time ---
            String dateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            Paragraph dateParagraph = new Paragraph("Generated on: " + dateTime, smallFont);
            dateParagraph.setAlignment(Element.ALIGN_RIGHT);
            document.add(dateParagraph);

            document.add(Chunk.NEWLINE);

            // --- Create Dataset for Bar Chart ---
            DefaultCategoryDataset dataset = new DefaultCategoryDataset();
            for (CountryUserCount c : data) {
                String country = c.get_id() != null ? c.get_id() : "Unknown";
                dataset.addValue(c.getCount(), "Users", country);
            }

            // --- Create Bar Chart ---
            JFreeChart barChart = ChartFactory.createBarChart(
                    "Users by Country",
                    "Country",
                    "User Count",
                    dataset,
                    PlotOrientation.VERTICAL,
                    false,
                    true,
                    false
            );

            CategoryPlot plot = barChart.getCategoryPlot();
            BarRenderer renderer = (BarRenderer) plot.getRenderer();
            // Customize chart colors
            barChart.setBackgroundPaint(Color.white);
            barChart.getTitle().setPaint(new Color(40, 111, 24));
            renderer.setSeriesPaint(0, new GradientPaint(0.0f, 0.0f, new Color(60, 163, 116),
                    0.0f, 0.0f, new Color(46, 139, 87)));


            BufferedImage chartImage = barChart.createBufferedImage(500, 300);
            ByteArrayOutputStream chartOut = new ByteArrayOutputStream();
            ImageIO.write(chartImage, "png", chartOut);
            Image chartPdf = Image.getInstance(chartOut.toByteArray());
            chartPdf.setAlignment(Element.ALIGN_CENTER);
            document.add(chartPdf);

            document.add(Chunk.NEWLINE);

            // --- Add Table Data ---
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2, 1});

            PdfPCell h1 = new PdfPCell(new Phrase("Country", titleFont));
            PdfPCell h2 = new PdfPCell(new Phrase("User Count", titleFont));
            h1.setHorizontalAlignment(Element.ALIGN_CENTER);
            h2.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(h1);
            table.addCell(h2);

            for (CountryUserCount c : data) {
                table.addCell(new Phrase(c.get_id() != null ? c.get_id() : "Unknown", normalFont));
                table.addCell(new Phrase(String.valueOf(c.getCount()), normalFont));
            }

            document.add(table);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
