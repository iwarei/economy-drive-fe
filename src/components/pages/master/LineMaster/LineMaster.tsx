import React, { useState } from 'react';
import { PageTemplate } from '../../../templates/PageTemplate';
import { Table } from '../../../organisms/Table';
import { LineMasterAddModal } from './LineMasterAddModal';
import { CommonButton } from '../../../atoms/Button';

export const LineMaster = () => {
  const [showLineMasterAddModal, setShowLineMasterAddModal] = useState(false);
  const tableHeaderProps = [
    {
      cellProps: [
        {
          text: '線名',
        },
        {
          text: '線名 (かな)',
        },
        {
          text: 'id',
        },
      ],
    },
  ];

  const tableRowProps = [
    {
      cellProps: [
        { text: '鹿児島本線' },
        { text: 'かごしまほんせん' },
        { text: '1' },
      ],
    },
    {
      cellProps: [{ text: '篠栗線' }, { text: 'ささぐりせん' }, { text: '2' }],
    },
  ];

  return (
    <PageTemplate headerText="線名マスタ">
      <div className="flex justify-end">
        <CommonButton
          text="追加"
          // 押下時アカウント削除確認モーダル非表示
          onClick={() => {
            setShowLineMasterAddModal(true);
          }}
        />
      </div>
      <Table headerProps={tableHeaderProps} rowProps={tableRowProps} sortable />
      <LineMasterAddModal
        openModal={showLineMasterAddModal}
        setOpenModal={setShowLineMasterAddModal}
      />
    </PageTemplate>
  );
};
