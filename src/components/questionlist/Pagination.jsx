import styled, { css } from 'styled-components';

const MOBILE = 767;
const DEFAULT_PAGE_SIZE = 8;

const SIZE = {
  large: css`
    --page-box-size: 40px;
    --page-font-size: 20px;
  `,
  small: css`
    --page-box-size: 30px;
    --page-font-size: 16px;
  `,
};

function getPageItems(totalPages, currentPage) {
  if (totalPages <= 5) {
    return range(1, totalPages);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', ...range(totalPages - 3, totalPages)];
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ];
}

function range(start, end) {
  const result = [];

  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }

  return result;
}

function Pagination({
  size = 'large',
  responsive = false,
  totalCount = 0,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = 1,
  onPageChange,
}) {
  if (pageSize <= 0) return null;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const pages = getPageItems(totalPages, currentPage);

  const handlePrevPage = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationWrap
      $size={size}
      $responsive={responsive}
      aria-label="페이지네이션"
    >
      <PageNavArrowBox>
        <PageNavArrow
          type="button"
          aria-label="이전 페이지"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          {'<'}
        </PageNavArrow>
      </PageNavArrowBox>

      <PageNavList>
        {pages.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <PageNavItem key={`ellipsis-${index}`}>
                <Ellipsis>...</Ellipsis>
              </PageNavItem>
            );
          }

          const isActive = item === currentPage;

          return (
            <PageNavItem key={item}>
              <PageNav
                type="button"
                $active={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onPageChange?.(item)}
              >
                {item}
              </PageNav>
            </PageNavItem>
          );
        })}
      </PageNavList>

      <PageNavArrowBox>
        <PageNavArrow
          type="button"
          aria-label="다음 페이지"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </PageNavArrow>
      </PageNavArrowBox>
    </PaginationWrap>
  );
}

export default Pagination;

const PaginationWrap = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $size }) => SIZE[$size] ?? SIZE.large}

  ${({ $responsive }) =>
    $responsive &&
    css`
      @media (max-width: ${MOBILE}px) {
        ${SIZE.small}
      }
    `}
`;

const PageNavArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--page-box-size);
  height: var(--page-box-size);
`;

const PageNavArrow = styled.button`
  width: 100%;
  height: 100%;
  font-size: var(--page-font-size);
  font-family: Actor, sans-serif;
  color: var(--grayScale-40);

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const PageNavList = styled.ol`
  display: flex;
`;

const PageNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--page-box-size);
  height: var(--page-box-size);
`;

const PageNav = styled.button`
  padding: 3px 6px;
  font-size: var(--page-font-size);
  font-family: Actor, sans-serif;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  color: ${({ $active }) =>
    $active ? 'var(--brown-40)' : 'var(--grayScale-40)'};
`;

const Ellipsis = styled.span`
  font-size: var(--page-font-size);
  font-family: Actor, sans-serif;
  line-height: 1;
  color: var(--grayScale-40);
`;
