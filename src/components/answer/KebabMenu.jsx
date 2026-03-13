import { useState } from 'react';
import styled from 'styled-components';
import KebabIcon from '../../assets/icons/icon-more.svg?react';
import EditIcon from '../../assets/icons/icon-edit.svg?react';
import DeleteIcon from '../../assets/icons/icon-close.svg?react';
import RejectIcon from '../../assets/icons/icon-rejection.svg?react';

export default function KebabMenu({
  onEdit,
  onDelete,
  onReject,
}) {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete?.();
  };

  const handleReject = () => {
    setOpen(false);
    onReject?.();
  };

  return (
    <KebabWrapper>
      <KebabButton
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <KebabIcon />
      </KebabButton>

      {open && (
        <Dropdown>
          {onEdit && (
            <MenuItem type="button" onClick={handleEdit}>
              <Icon>
                <EditIcon />
              </Icon>
              수정하기
            </MenuItem>
          )}

          {onDelete && (
            <MenuItem type="button" onClick={handleDelete}>
              <Icon>
                <DeleteIcon />
              </Icon>
              삭제하기
            </MenuItem>
          )}

          {onReject && (
            <MenuItem type="button" onClick={handleReject}>
              <Icon>
                <RejectIcon />
              </Icon>
              답변 거절
            </MenuItem>
          )}
        </Dropdown>
      )}
    </KebabWrapper>
  );
}

const KebabWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const KebabButton = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  width: 120px;
  padding: 4px 0;
  background: var(--grayScale-10, #fff);
  border: 1px solid var(--grayScale-30, #cfcfcf);
  border-radius: 8px;
  box-shadow: var(--shadow-1pt);
  z-index: 10;
`;

const MenuItem = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: var(--grayScale-10, #fff);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--grayScale-50, #515151);
  cursor: pointer;

  &:hover {
    background: var(--grayScale-20, #f9f9f9);
    color: var(--blue-50, #1877f2);

    svg {
      color: var(--blue-50, #1877f2);
    }
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;

  svg path {
    fill: currentColor;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;