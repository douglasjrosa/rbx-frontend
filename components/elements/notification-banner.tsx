'use client';

import classNames from 'classnames';
import Markdown from 'react-markdown';

interface NotificationBannerProps {
  data: { text: string; type: string };
  closeSelf: () => void;
}

export default function NotificationBanner({
  data: { text, type },
  closeSelf,
}: NotificationBannerProps) {
  return (
    <div
      className={classNames(
        'text-white px-2 fixed w-full z-40 py-6 bg-opacity-90 bottom-0',
        { 'bg-gray-900': type === 'info' },
        { 'bg-yellow-600': type === 'warning' },
        { 'bg-red-600': type === 'alert' },
      )}
    >
      <div className="container flex flex-row justify-between items-center">
        <div className="rich-text-banner flex-1 leading-relaxed text-lg">
          <Markdown>{text}</Markdown>
        </div>
        <button
          type="button"
          onClick={closeSelf}
          className="px-1 py-1 flex-shrink-0 ml-4"
          aria-label="Fechar notificação de cookies"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
