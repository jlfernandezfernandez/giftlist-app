// components/confirm-bought-modal.tsx

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface ConfirmBoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  giftName: string;
  giftLink: string;
}

export const ConfirmBoughtModal: React.FC<ConfirmBoughtModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  giftName,
  giftLink,
}) => {
  const [step, setStep] = useState<'pre-buy' | 'post-buy'>('pre-buy');

  const handleBuy = () => {
    window.open(giftLink, "_blank");
    setStep('post-buy');
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButtonActive>
      <div className="text-center">
        {step === 'pre-buy' ? (
          <>
            <h3 className="text-lg font-medium mb-4">Buy Gift</h3>
            <p className="mb-6">You're about to be redirected to buy "{giftName}". After your purchase, please come back to confirm.</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleBuy} variant="black">
                Proceed to Buy
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium mb-4">Confirm Purchase</h3>
            <p className="mb-6">Have you already bought the gift "{giftName}"?</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={onClose} variant="outline">
                No, I haven't
              </Button>
              <Button onClick={handleConfirm} variant="black">
                Yes, I've bought it
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
