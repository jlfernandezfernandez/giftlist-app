// components/edit-gift-list-modal.tsx
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { GiftListForm } from "@/components/gift-list-form";
import { GiftList } from "@/types/gift-list";
import { useUpdateGiftList } from "@/hooks/use-update-gift-list";

interface EditGiftListModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftList: GiftList;
}

export const EditGiftListModal: React.FC<EditGiftListModalProps> = ({
  isOpen,
  onClose,
  giftList,
}) => {
  const [name, setName] = useState(giftList.name);
  const [description, setDescription] = useState(giftList.description);
  const [date, setDate] = useState(giftList.date);
  const { updateGiftList, isLoading } = useUpdateGiftList();

  useEffect(() => {
    setName(giftList.name);
    setDescription(giftList.description);
    setDate(giftList.date);
  }, [giftList]);

  const handleSubmit = async (data: {
    name: string;
    description: string;
    date: string;
  }) => {
    await updateGiftList(giftList.id, data.name, data.description, data.date);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButtonActive>
      <div className="text-left">
        <h2 className="text-2xl font-bold mb-4">Edit Gift List</h2>
        <GiftListForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="Update Gift List"
        />
      </div>
    </Modal>
  );
};
