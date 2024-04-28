import React from 'react';
import { Modal } from '../../../organisms/Modal';
import { InputFormWithLabel } from '../../../molecules/InputFormWithLabel';
import { CommonButton, PrimaryButton } from '../../../atoms/Button';
import { SelectWithLabel } from '../../../molecules/SelectWithLabel';

export type TrainTypeMasterAddModalProps = {
  openModal: boolean; // モーダル表示状態のuseState
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // モーダル表示状態のuseState
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TrainTypeMasterAddModal = ({
  openModal,
  setOpenModal,
  onChange,
}: TrainTypeMasterAddModalProps) => {
  return (
    <Modal
      header="列車種別追加"
      openModal={openModal}
      setOpenModalBoolean={setOpenModal}
      staticModal
    >
      <SelectWithLabel
        id="lineName"
        name="lineName"
        labelText="線名"
        optionText={['鹿児島本線', '日豊本線', '篠栗線']}
        optionValue={['0', '1', '2']}
      />
      <InputFormWithLabel
        labelText="列車種別"
        type="lineType"
        formName="line-type"
        onChange={onChange}
      />
      <InputFormWithLabel
        labelText="列車種別（かな）"
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
