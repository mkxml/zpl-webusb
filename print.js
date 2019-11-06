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

async function setup() {
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
      console.error(e);
    }
  }
  if (device) {
    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);
  } else {
    console.log("No devices...");
  }
  const btn = document.getElementById('printbtn');
  btn.addEventListener('click', print, false);
  if (device) {
    const printer = document.getElementById('printer');
    printer.innerText = `Printer: ${device.productName}`;
  }
}

document.addEventListener('DOMContentLoaded', setup, false);
