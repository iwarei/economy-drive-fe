import React, { useState } from 'react';
import { PageTemplate } from '../../../templates/PageTemplate';
import {
  Table,
  TableProps,
  HeaderProps,
  RowProps,
} from '../../../organisms/Table';
import { LineMasterAddModal } from './LineMasterAddModal';
import { CommonButton } from '../../../atoms/Button';
import { CheckBox } from '../../../atoms/CheckBox';

export const LineMaster = () => {
  const [showLineMasterAddModal, setShowLineMasterAddModal] = useState(false);
  const tableHeaderProps: HeaderProps[] = [
    {
      cellProps: [
        {
          text: '線名',
        },
        {
          text: '線名 (かな)',
        },
        {
          text: '複数路線跨ぎ',
        },
        {
          text: 'id',
        },
      ],
    },
  ];

  const tableRowProps: RowProps[] = [
    {
      cellProps: [
        { type: 'text', text: '鹿児島本線' },
        { type: 'text', text: 'かごしまほんせん' },
        {
          type: 'html',
          html: <CheckBox name="cell1" disabled key="鹿児島本線" />,
          text: 'no',
          className: 'px-6 py-4',
        },
        { type: 'text', text: '1' },
      ],
    },
    {
      cellProps: [
        { type: 'text', text: '篠栗線' },
        { type: 'text', text: 'ささぐりせん' },
        {
          type: 'html',
          html: <CheckBox name="cell2" disabled key="篠栗線" />,
          text: 'no',
          className: 'px-6 py-4',
        },
        { type: 'text', text: '2' },
      ],
    },
    {
      cellProps: [
        { type: 'text', text: '筑豊本線' },
        { type: 'text', text: 'ちくほうほんせん' },
        {
          type: 'html',
          html: <CheckBox name="cell3" disabled key="筑豊本線" />,
          text: 'no',
          className: 'px-6 py-4',
        },
        { type: 'text', text: '3' },
      ],
    },
    {
      cellProps: [
        { type: 'text', text: '福北ゆたか線' },
        { type: 'text', text: 'ふくほくゆたかせん' },
        {
          type: 'html',
          html: <CheckBox name="cell4" checked disabled key="福北ゆたか線" />,
          text: 'yes',
          className: 'px-6 py-4',
        },
        { type: 'text', text: '4' },
      ],
    },
  ];

  const tableProps: TableProps = {
    headerProps: tableHeaderProps,
    rowProps: tableRowProps,
    sortable: true,
  };

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
      <Table {...tableProps} />
      <LineMasterAddModal
        openModal={showLineMasterAddModal}
        setOpenModal={setShowLineMasterAddModal}
      />
    </PageTemplate>
  );
};
