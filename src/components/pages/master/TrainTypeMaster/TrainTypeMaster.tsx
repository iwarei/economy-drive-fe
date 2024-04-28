import React, { useState } from 'react';
import { PageTemplate } from '../../../templates/PageTemplate';
import { Table } from '../../../organisms/Table';
import { TrainTypeMasterAddModal } from './TrainTypeMasterAddModal';
import { CommonButton } from '../../../atoms/Button';
import { SelectWithLabel } from '../../../molecules/SelectWithLabel';

export const TrainTypeMaster = () => {
  const [showTrainTypeMasterAddModal, setShowTrainTypeMasterAddModal] =
    useState(false);
  const tableHeaderProps = [
    {
      cellProps: [
        {
          text: '列車種別',
        },
        {
          text: '列車種別 (かな)',
        },
        {
          text: 'id',
        },
      ],
    },
  ];

  const tableRowProps = [
    {
      cellProps: [{ text: '普通' }, { text: 'ふつう' }, { text: '1' }],
    },
    {
      cellProps: [{ text: '快速' }, { text: 'かいそく' }, { text: '2' }],
    },
    {
      cellProps: [
        { text: '区間快速 (二日市-博多)' },
        { text: 'くかんかいそく' },
        { text: '3' },
      ],
    },
    {
      cellProps: [
        { text: '区間快速 (鳥栖-福間)' },
        { text: 'くかんかいそく' },
        { text: '4' },
      ],
    },
    {
      cellProps: [
        { text: '区間快速 (久留米-博多)' },
        { text: 'くかんかいそく' },
        { text: '5' },
      ],
    },
    {
      cellProps: [
        { text: '区間快速 (博多-福間)' },
        { text: 'くかんかいそく' },
        { text: '6' },
      ],
    },
  ];

  return (
    <>
      <PageTemplate headerText="列車種別マスタ">
        <div className="flex">
          <div className="w-full">
            <SelectWithLabel
              id="lineName"
              name="lineName"
              labelText="線名"
              optionText={['鹿児島本線', '日豊本線', '篠栗線']}
              optionValue={['0', '1', '2']}
            />
          </div>
          <div className="flex items-center w-fit min-w-max ps-2 pt-4">
            <CommonButton
              text="追加"
              // 押下時アカウント削除確認モーダル非表示
              onClick={() => {
                setShowTrainTypeMasterAddModal(true);
              }}
            />
          </div>
        </div>

        <Table
          headerProps={tableHeaderProps}
          rowProps={tableRowProps}
          sortable
        />
      </PageTemplate>

      <TrainTypeMasterAddModal
        openModal={showTrainTypeMasterAddModal}
        setOpenModal={setShowTrainTypeMasterAddModal}
      />
    </>
  );
};
