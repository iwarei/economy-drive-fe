import React from 'react';
import { Modal } from '../../../organisms/Modal';
import { InputFormWithLabel } from '../../../molecules/InputFormWithLabel';
import { CommonButton, PrimaryButton } from '../../../atoms/Button';

export type WardMasterAddModalProps = {
  openModal: boolean; // モーダル表示状態のuseState
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // モーダル表示状態のuseState
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const WardMasterAddModal = ({
  openModal,
  setOpenModal,
  onChange,
}: WardMasterAddModalProps) => {
  return (
    <Modal
      header="箇所追加"
      openModal={openModal}
      setOpenModalBoolean={setOpenModal}
      staticModal
    >
      <InputFormWithLabel
        labelText="箇所名"
        type="lineType"
        formName="line-type"
        onChange={onChange}
      />
      <InputFormWithLabel
        labelText="箇所名（かな）"
        type="lineTypeKana"
        formName="line-type-kana"
        onChange={onChange}
      />
      <hr className="py-0 my-0" />
      <div className="text-end">
        <CommonButton text="戻る" className="py-0 my-0" />
        <PrimaryButton text="登録" className="py-0 my-0" />
      </div>
    </Modal>
  );
};
