import React, { useState, useEffect } from "react";
import "./PaymentWizard.css";

function PaymentWizard({ cartItems, total, onBackToCart }) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardType: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect card type
  useEffect(() => {
    if (payment.cardNumber) {
      const cardNumber = payment.cardNumber.replace(/\s/g, "");
      if (/^4/.test(cardNumber)) {
        setPayment((p) => ({ ...p, cardType: "visa" }));
      } else if (/^5[1-5]/.test(cardNumber)) {
        setPayment((p) => ({ ...p, cardType: "mastercard" }));
      } else if (/^3[47]/.test(cardNumber)) {
        setPayment((p) => ({ ...p, cardType: "amex" }));
      } else if (/^6(?:011|5)/.test(cardNumber)) {
        setPayment((p) => ({ ...p, cardType: "discover" }));
      } else {
        setPayment((p) => ({ ...p, cardType: "" }));
      }
    } else {
      setPayment((p) => ({ ...p, cardType: "" }));
    }
  }, [payment.cardNumber]);

  // Format helpers
  const formatCardNumber = (val) =>
    val
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) =>
    val.replace(/\s+/g, "").replace(/[^0-9]/gi, "").replace(/(\d{2})(\d{0,2})/, "$1/$2");

  // Step navigation
  const nextStep = () => {
    const currentErrors = validateStep(step);
    if (Object.keys(currentErrors).length === 0) {
      setStep((s) => s + 1);
      setErrors({});
    } else setErrors(currentErrors);
  };
  const prevStep = () => setStep((s) => s - 1);

  // Validation
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!shipping.fullName) newErrors.fullName = "Full name required";
      if (!shipping.email) newErrors.email = "Email required";
      else if (!/\S+@\S+\.\S+/.test(shipping.email))
        newErrors.email = "Invalid email";
      if (!shipping.address) newErrors.address = "Address required";
      if (!shipping.city) newErrors.city = "City required";
      if (!shipping.zip) newErrors.zip = "ZIP required";
    }
    if (step === 2 && payment.method === "card") {
      if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, "").length < 16)
        newErrors.cardNumber = "Invalid card number";
      if (!payment.expiry || !/^\d{2}\/\d{2}$/.test(payment.expiry))
        newErrors.expiry = "Expiry MM/YY";
      if (!payment.cvv || payment.cvv.length < 3)
        newErrors.cvv = "Invalid CVV";
    }
    return newErrors;
  };

  // Handlers
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((s) => ({ ...s, [name]: value }));
    setErrors((er) => {
      const copy = { ...er };
      delete copy[name];
      return copy;
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry") formatted = formatExpiry(value);
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 4);
    setPayment((p) => ({ ...p, [name]: formatted }));
    setErrors((er) => {
      const copy = { ...er };
      delete copy[name];
      return copy;
    });
  };

  const handlePaymentMethodChange = (method) =>
    setPayment((p) => ({ ...p, method }));

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    alert("✅ Order placed successfully!");
    setIsSubmitting(false);
  };

  // Steps
  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="payment-wizard">
      {/* Progress bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(step / 3) * 100}%` }}
        />
        <div className="steps">
          {steps.map((lbl, i) => (
            <div
              key={i}
              className={`step ${
                step > i + 1 ? "completed" : step === i + 1 ? "active" : ""
              }`}
            >
              <div className="step-number">{i + 1}</div>
              <div className="step-label">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="wizard-content">
        {/* Step 1: Shipping */}
        {step === 1 && (
          <div className="wizard-step">
            <h2>Shipping Information</h2>
            <form className="form-grid">
              {["fullName", "email", "address", "city", "zip"].map((field) => (
                <div
                  key={field}
                  className={`input-group ${
                    field === "address" ? "full-width" : ""
                  }`}
                >
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
                    value={shipping[field]}
                    onChange={handleShippingChange}
                    className={errors[field] ? "error" : ""}
                  />
                  {errors[field] && (
                    <span className="error-text">{errors[field]}</span>
                  )}
                </div>
              ))}
            </form>
            <div className="wizard-buttons">
              <button className="btn-secondary" onClick={onBackToCart}>
                ← Back to Cart
              </button>
              <button className="btn-primary" onClick={nextStep}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="wizard-step">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              {/* Card */}
              <div
                className={`payment-method ${
                  payment.method === "card" ? "active" : ""
                }`}
                onClick={() => handlePaymentMethodChange("card")}
              >
                <div className="method-header">
                  <input
                    type="radio"
                    checked={payment.method === "card"}
                    readOnly
                  />
                  <span className="method-title">💳 Credit/Debit Card</span>
                </div>
                {payment.method === "card" && (
                  <div className="card-form">
                    <div className="input-group">
                      <div className="input-with-icon">
                        <input
                          name="cardNumber"
                          placeholder="Card Number"
                          value={payment.cardNumber}
                          onChange={handlePaymentChange}
                          className={errors.cardNumber ? "error" : ""}
                          maxLength={19}
                        />
                        {payment.cardType && (
                          <div className={`card-icon ${payment.cardType}`} />
                        )}
                      </div>
                      {errors.cardNumber && (
                        <span className="error-text">{errors.cardNumber}</span>
                      )}
                    </div>
                    <div className="card-details">
                      <input
                        name="expiry"
                        placeholder="MM/YY"
                        value={payment.expiry}
                        onChange={handlePaymentChange}
                        className={errors.expiry ? "error" : ""}
                        maxLength={5}
                      />
                      <input
                        name="cvv"
                        placeholder="CVV"
                        value={payment.cvv}
                        onChange={handlePaymentChange}
                        className={errors.cvv ? "error" : ""}
                        maxLength={4}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div
                className={`payment-method ${
                  payment.method === "cod" ? "active" : ""
                }`}
                onClick={() => handlePaymentMethodChange("cod")}
              >
                <div className="method-header">
                  <input type="radio" checked={payment.method === "cod"} readOnly />
                  <span className="method-title">🚚 Cash on Delivery</span>
                </div>
                {payment.method === "cod" && (
                  <p>Pay cash when delivered.</p>
                )}
              </div>
            </div>
            <div className="wizard-buttons">
              <button className="btn-secondary" onClick={prevStep}>
                ← Back
              </button>
              <button className="btn-primary" onClick={nextStep}>
                Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="wizard-step">
            <h2>Review Order</h2>
            <div className="review-section">
              <div className="review-box">
                {cartItems.map((item) => (
                  <div key={item.id} className="review-item">
                    <span>{item.name} x {item.qty}</span>
                    <span>Rs. {item.price * item.qty}</span>
                  </div>
                ))}
                <h3>Total: Rs. {total}</h3>
              </div>
              <div className="shipping-review">
                <p>{shipping.fullName}</p>
                <p>{shipping.email}</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}, {shipping.zip}</p>
              </div>
              <div className="payment-review">
                <p>
                  {payment.method === "card"
                    ? `Card ending ${payment.cardNumber.slice(-4)}`
                    : "Cash on Delivery"}
                </p>
              </div>
            </div>
            <div className="wizard-buttons">
              <button className="btn-secondary" onClick={prevStep}>
                ← Back
              </button>
              <button
                className="btn-primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentWizard;
