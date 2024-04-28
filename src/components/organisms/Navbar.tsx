import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useOutsideClick } from '../../hooks/useOutsideClick';

type NavbarProps = {
  showButton?: boolean;
  className?: string;
  divClassName?: string;
};

type NavbarLinkProps = {
  link?: string;
  text: string;
  onClick?: () => void;
};

type NavbarWithDropdownProps = {
  text: string;
  dropdownTexts: string[];
  dropdownLinks: string[];
};

const PageTitleAndLogo = () => {
  return (
    <>
      <svg
        className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        // width="24"
        // height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 5.464V3.099m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C19 17.4 19 18 18.462 18H5.538C5 18 5 17.4 5 16.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.464ZM6 5 5 4M4 9H3m15-4 1-1m1 5h1M8.54 18a3.48 3.48 0 0 0 6.92 0H8.54Z"
        />
      </svg>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        省エネくん
      </span>
    </>
  );
};

const NavbarLink = ({ link, text, onClick }: NavbarLinkProps) => {
  const navigate = useNavigate();
  const isAuthed = useSelector((state: any) => state.user.isAuthed);

  return !isAuthed ? (
    <li>
      <a
        href={link}
        className="block w-full py-2 pl-3 pr-4 text-start text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        {text}
      </a>
    </li>
  ) : (
    <li>
      <button
        type="button"
        className="block w-full py-2 pl-3 pr-4 text-start text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        onClick={() => {
          if (onClick) {
            onClick();
          }
          if (link) {
            navigate(link);
          }
        }}
      >
        {text}
      </button>
    </li>
  );
};

const NavbarWithDropdown = ({
  text,
  dropdownTexts,
  dropdownLinks,
}: NavbarWithDropdownProps) => {
  const navigate = useNavigate();
  const isAuthed = useSelector((state: any) => state.user.isAuthed);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  if (!isAuthed) return null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li ref={dropdownRef}>
      <button
        id="dropdownNavbarLink"
        data-dropdown-toggle="dropdownNavbar"
        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        onClick={toggleDropdown}
      >
        {text}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdownNavbar"
          className="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownLargeButton"
          >
            {dropdownLinks.map((link, i) => (
              <li key={`${link}-${dropdownTexts[i]}`}>
                <button
                  className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    navigate(link);
                  }}
                >
                  {dropdownTexts[i]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export const Navbar = ({
  showButton = true,
  className = '',
  divClassName = '',
}: NavbarProps) => {
  const navigate = useNavigate();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [width, setWidth] = useState<undefined | number>(undefined);

  const isAuthed = useSelector((state: any) => state.user.isAuthed);
  const { logout } = useAuth();

  // ナビバー左サイドのロゴ・リンク押下時のイベントハンドラ
  const titleButtonHandler = () => {
    navigate('/');
  };

  // ログアウトボタン押下時のイベントハンドラ
  const logoutButtonHandler = async () => {
    await logout({});
  };

  // 画面幅の変更を検知
  useLayoutEffect(() => {
    const updateWidth = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 画面幅が768px以上になった際、ナビバーを閉じる
  useEffect(() => {
    if (isNavbarOpen && width && width >= 768) {
      setIsNavbarOpen(false);
    }
  }, [width]);

  return (
    <nav
      className={`border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <div
        className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ${divClassName}`}
      >
        {/* ナビバーの左サイドのロゴ・リンク */}
        {!isAuthed ? (
          // 未認証時はaタグでリンクを貼る
          <a href="/" className="flex items-center">
            <PageTitleAndLogo />
          </a>
        ) : (
          // 認証時はnavigateでリンクさせる
          <button
            type="button"
            className="flex items-center"
            onClick={titleButtonHandler}
          >
            <PageTitleAndLogo />
          </button>
        )}
        {/* ナビバーの右サイドのボタン・リンク */}
        {showButton && (
          <>
            <button
              data-collapse-toggle="navbar-solid-bg"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-solid-bg"
              aria-expanded="false"
              onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <div
              className={
                isNavbarOpen
                  ? `w-full md:block md:w-auto`
                  : `hidden w-full md:block md:w-auto`
              }
              id="navbar-solid-bg"
            >
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                {/* 認証状況によりボタン・リンクを出し分けする */}
                {!isAuthed ? (
                  //  未認証時のボタン・リンク
                  <NavbarLink link="/login" text="ログイン" />
                ) : (
                  // 認証時のボタン・リンク
                  <>
                    {/* 通知地点マスタ */}
                    <NavbarLink text="通知地点" link="/notify-point-master" />
                    {/* マスタ一覧ドロップダウン */}
                    <NavbarWithDropdown
                      text="各種マスタ"
                      dropdownTexts={[
                        '線名マスタ',
                        '箇所マスタ',
                        '列車種別マスタ',
                      ]}
                      dropdownLinks={[
                        '/master/line',
                        '/master/ward',
                        '/master/train-type',
                      ]}
                    />
                    {/* アカウント情報編集リンク */}
                    <NavbarLink text="アカウント" link="/account" />
                    {/* ログアウトボタン */}
                    <NavbarLink
                      text="ログアウト"
                      onClick={logoutButtonHandler}
                    />
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
