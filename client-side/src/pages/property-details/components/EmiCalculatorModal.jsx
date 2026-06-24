import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const EmiCalculatorModal = ({ isOpen, onClose, propertyPrice = 0 }) => {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8); // Default 80% loan
  const [interestRate, setInterestRate] = useState(8.5); // Default 8.5% pa
  const [loanTenure, setLoanTenure] = useState(20); // Default 20 years
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (propertyPrice > 0) {
      setLoanAmount(propertyPrice * 0.8);
    }
  }, [propertyPrice]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTenure) {
      setEmi(0);
      return;
    }
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTenure) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiValue));
    } else {
      setEmi(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-gray-200 rounded-md shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">EMI Calculator</h2>
            <p className="text-sm text-gray-500 mt-1">Estimate your monthly payments</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded border border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-semibold mb-1">Estimated EMI</p>
            <h3 className="text-3xl font-extrabold text-blue-600">
              ₹{emi.toLocaleString("en-IN")}
              <span className="text-base text-gray-500 font-medium ml-1">/ month</span>
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Amount (₹)
              </label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                min="0"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interest Rate (% p.a.)
              </label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                step="0.1"
                min="0"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Tenure (Years)
              </label>
              <Input
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                placeholder="Enter loan tenure"
                min="1"
                max="30"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <Button fullWidth onClick={onClose} className="bg-gray-900 hover:bg-gray-800 text-white rounded py-3">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculatorModal;
