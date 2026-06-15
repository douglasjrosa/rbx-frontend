'use client';

import { useState, useEffect } from 'react';
import Image from './image';
import type { MediaAsset } from '@/lib/content/types';

function isMobileUserAgent(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );
}

interface WhatsAppButtonProps {
  media: MediaAsset;
  contatos: { nome: string; fone: string }[];
  msg: string;
}

export default function WhatsAppButton({
  media,
  contatos,
  msg,
}: WhatsAppButtonProps) {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile =
    mounted && typeof navigator !== 'undefined'
      ? isMobileUserAgent(navigator.userAgent)
      : false;
  const whatsappInterface = isMobile ? 'api' : 'web';
  const baseUrl = `https://${whatsappInterface}.whatsapp.com/send?phone=`;

  return (
    <div className="z-30">
      <div className="fixed bottom-24 right-5">
        <button
          type="button"
          className="w-[90px]"
          aria-expanded={buttonIsClicked}
          aria-haspopup="true"
          aria-label="Botão Whatsapp"
          onClick={() => setButtonIsClicked(!buttonIsClicked)}
        >
          <Image
            media={media}
            width={90}
            height={90}
            alternativeText="Ícone do Whatsapp"
          />
        </button>
      </div>
      {buttonIsClicked && (
        <div
          className={
            'rounded bg-white p-3 flex flex-col fixed bottom-52 right-5 ' +
            'border shadow-lg shadow-black'
          }
        >
          {contatos.map((contato) => (
            <a
              key={contato.fone}
              className={
                'rounded-full bg-green-500 hover:bg-green-600 py-1 px-6 ' +
                'text-white text-lg flex my-2'
              }
              href={`${baseUrl}${contato.fone}&text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setButtonIsClicked(false)}
            >
              <span className="text-white ml-2 text-xl text-left">
                {contato.nome}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
