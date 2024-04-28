import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type RouteAuthGuardProps = {
  children: ReactNode;
  redirect?: string;
};

export const RouteAuthGuard = ({
  children,
  redirect = '/login',
}: RouteAuthGuardProps) => {
  const navigate = useNavigate();
  const isAuthed = useSelector((state: any) => state.user.isAuthed);

  useEffect(() => {
    if (!isAuthed) {
      navigate(redirect);
    }
  }, [isAuthed]);

  if (!isAuthed) {
    return null;
  }

  return React.cloneElement(children as React.ReactElement);
};
