import * as React from 'react';

function SvgComponent({ color = '#f5f5f5', ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={50}
      height={49.989}
      {...props}
    >
      <path
        data-name='Icon awesome-instagram'
        d='M25.005 12.178a12.816 12.816 0 1012.817 12.816 12.8 12.8 0 00-12.817-12.816zm0 21.149a8.332 8.332 0 118.332-8.332 8.348 8.348 0 01-8.332 8.331zm16.33-21.674a2.989 2.989 0 11-2.989-2.991 2.982 2.982 0 012.989 2.991zm8.489 3.034c-.19-4-1.1-7.552-4.038-10.474S39.316.376 35.312.175c-4.127-.234-16.5-.234-20.625 0-3.993.19-7.54 1.1-10.474 4.027S.376 10.672.175 14.676c-.234 4.127-.234 16.5 0 20.625.19 4 1.1 7.552 4.038 10.474s6.47 3.837 10.474 4.038c4.127.234 16.5.234 20.625 0 4-.19 7.552-1.1 10.474-4.038s3.837-6.47 4.038-10.474c.234-4.127.234-16.486 0-20.613zm-5.332 25.042a8.436 8.436 0 01-4.752 4.752c-3.291 1.305-11.1 1-14.735 1s-11.456.29-14.735-1a8.436 8.436 0 01-4.752-4.752c-1.305-3.291-1-11.1-1-14.735s-.29-11.456 1-14.735a8.436 8.436 0 014.752-4.752c3.291-1.305 11.1-1 14.735-1s11.456-.29 14.735 1a8.436 8.436 0 014.752 4.755c1.305 3.291 1 11.1 1 14.735s.305 11.453-1 14.732z'
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
