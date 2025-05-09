import * as React from 'react';

// By: ri
// See: https://v0.app/icon/ri/filter-line
// Example: <IconRiFilterLine width="24px" height="24px" style={{color: "#000000"}} />

export const IconRiFilterLine = ({
    height = '1em',
    fill = 'currentColor',
    focusable = 'false',
    ...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={height}
        focusable={focusable}
        {...props}
    >
        <path fill={fill} d="M21 4v2h-1l-5 7.5V22H9v-8.5L4 6H3V4zM6.404 6L11 12.894V20h2v-7.106L17.596 6z" />
    </svg>
);
