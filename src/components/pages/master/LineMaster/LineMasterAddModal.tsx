import React from 'react';
import { Modal } from '../../../organisms/Modal';
import { InputFormWithLabel } from '../../../molecules/InputFormWithLabel';
import { CommonButton, PrimaryButton } from '../../../atoms/Button';
import { ToggleWithLabel } from '../../../molecules/ToggleWithLabel';

export type LineMasterAddModalProps = {
  openModal: boolean; // モーダル表示状態のuseState
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // モーダル表示状態のuseState
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LineMasterAddModal = ({
  openModal,
  setOpenModal,
  onChange,
}: LineMasterAddModalProps) => {
  return (
    <Modal
      header="線名追加"
      openModal={openModal}
      setOpenModalBoolean={setOpenModal}
      staticModal
    >
      <InputFormWithLabel
        labelText="線名"
        type="lineType"
        formName="line-type"
        onChange={onChange}
      />
      <InputFormWithLabel
        labelText="線名（かな）"
        type="lineTypeKana"
        formName="line-type-kana"
        onChange={onChange}
      />
      <ToggleWithLabel name="parent" text="複数の路線を跨いで走行する親路線" />
      <hr className="py-0 my-0" />
      <div className="text-end">
        <CommonButton text="戻る" className="py-0 my-0" />
        <PrimaryButton text="登録" className="py-0 my-0" />
      </div>
    </Modal>
  );
};
