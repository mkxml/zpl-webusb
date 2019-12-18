// Zebra vendor id (could be others)
const VENDOR_ID = 2655;

let device;
let label;

async function print() {
  if (device) {
    const textarea = document.getElementById('zpldata');
    const encoder = new TextEncoder();
    const text = textarea.value;
    const data = encoder.encode(text);
    try {
      label.innerText = 'Printing...';
      const res = await device.transferOut(1, data);
      label.innerText = 'Check the printer!';
      console.log(res);
    } catch (e) {
      alert('Device disconnected!')
    }
  } else {
    alert('No device!');
  }
}

function showConnectButton() {
  const btn = document.querySelector('.connectbtn');
  btn.addEventListener('click', connectPrinter, false);
}

function hideConnectButton() {
  const btn = document.querySelector('.connectbtn');
  btn.parentElement.removeChild(btn);
}

async function connectPrinter() {
  // Check if we have devices available
  let devices = await navigator.usb.getDevices();
  device = devices[0];
  label = document.getElementById('label');
  if (devices.length === 0) {
    try {
      // Get permission from the user to use their printer
      device = await navigator.usb.requestDevice({ filters: [{ vendorId: VENDOR_ID }]});
    }
    catch (e) {
      label.innerText = 'Please give permission to get the USB printer...';
      console.warn(e);
    }
  }
  if (device) {
    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    const printer = document.getElementById('printer');
    printer.innerText = `Printer: ${device.productName}`;
    hideConnectButton();
  } else {
    console.log("No devices...");
  }
}

async function setup() {
  showConnectButton();
  // Try to connect onload
  await connectPrinter();
  const btn = document.getElementById('printbtn');
  btn.addEventListener('click', print, false);
}

document.addEventListener('DOMContentLoaded', setup, false);
