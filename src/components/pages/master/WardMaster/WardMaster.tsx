import React, { useState } from 'react';
import { PageTemplate } from '../../../templates/PageTemplate';
import { Table } from '../../../organisms/Table';
import { WardMasterAddModal } from './WardMasterAddModal';
import { CommonButton } from '../../../atoms/Button';

export const WardMaster = () => {
  const [showWardMasterAddModal, setShowWardMasterAddModal] = useState(false);
  const tableHeaderProps = [
    {
      cellProps: [
        {
          text: '箇所名',
        },
        {
          text: '箇所名 (かな)',
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
        { text: '博多運転区' },
        { text: 'はかたうんてんく' },
        { text: '1' },
      ],
    },
    {
      cellProps: [
        { text: '南福岡運転区' },
        { text: 'みなみふくおかうんてんく' },
        { text: '2' },
      ],
    },
  ];

  return (
    <PageTemplate headerText="箇所名マスタ">
      <div className="flex justify-end">
        <CommonButton
          text="追加"
          // 押下時アカウント削除確認モーダル非表示
          onClick={() => {
            setShowWardMasterAddModal(true);
          }}
        />
      </div>
      <Table headerProps={tableHeaderProps} rowProps={tableRowProps} />
      <WardMasterAddModal
        openModal={showWardMasterAddModal}
        setOpenModal={setShowWardMasterAddModal}
      />
    </PageTemplate>
  );
};
