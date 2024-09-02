// dateConverter.js
import { writable, derived } from 'svelte/store';

export const rawCheckInDate = writable('');
export const rawCheckOutDate = writable('');

const months = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
};

function convertDateFormat(inputDate) {
  if (!inputDate) return null;

  const parts = inputDate.trim().split(/\s+/);
  if (parts.length >= 3) {
    const [dayOfWeek, day, monthStr, yearStr] = parts;
    const month = months[monthStr.toLowerCase().slice(0, 3)];
    if (!month) {
      console.error('Invalid month:', monthStr);
      return null;
    }
    const year = yearStr || new Date().getFullYear().toString();
    return `${year}-${month}-${day.padStart(2, '0')}`;
  }

  console.error('Unable to parse date:', inputDate);
  return null;
}

export const checkInDate = derived(rawCheckInDate, $rawCheckInDate => convertDateFormat($rawCheckInDate));
export const checkOutDate = derived(rawCheckOutDate, $rawCheckOutDate => convertDateFormat($rawCheckOutDate));

export function initializeDateObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const firstDate = document.querySelector('.js-first-date');
        const lastDate = document.querySelector('.js-last-date');
        
        if (firstDate) rawCheckInDate.set(firstDate.textContent.trim());
        if (lastDate) rawCheckOutDate.set(lastDate.textContent.trim());
      }
    });
  });

  const config = { childList: true, characterData: true, subtree: true };
  const targetNode = document.querySelector('.js-calendar-el');
  
  if (targetNode) {
    observer.observe(targetNode, config);
  } else {
    console.error('Calendar element not found');
  }

  return () => observer.disconnect();
}