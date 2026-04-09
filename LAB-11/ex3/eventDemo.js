const EventEmitter = require('events');

const appEvents = new EventEmitter();

console.log('Starting event-driven demo...');

// Multiple listeners for the same event.
appEvents.on('orderPlaced', (orderId, customerName) => {
  console.log(`[Listener 1] Order received: ${orderId} from ${customerName}`);
});

appEvents.on('orderPlaced', (orderId, customerName) => {
  console.log(`[Listener 2] Sending confirmation email for ${orderId} to ${customerName}`);
});

// Another custom event with payload data.
appEvents.on('paymentProcessed', (orderId, amount) => {
  console.log(`[Payment] Order ${orderId} paid successfully. Amount: $${amount}`);
});

appEvents.on('deliveryScheduled', (orderId, eta) => {
  console.log(`[Delivery] Order ${orderId} delivery scheduled. ETA: ${eta}`);
});

appEvents.on('orderError', (orderId, reason) => {
  console.log(`[Error] Order ${orderId} failed. Reason: ${reason}`);
});

// Trigger events asynchronously to demonstrate event-driven architecture.
setTimeout(() => {
  appEvents.emit('orderPlaced', 'ORD-101', 'Amina');
}, 200);

setTimeout(() => {
  appEvents.emit('paymentProcessed', 'ORD-101', 49.99);
}, 400);

setTimeout(() => {
  appEvents.emit('deliveryScheduled', 'ORD-101', 'Tomorrow 10:00 AM');
}, 600);

setTimeout(() => {
  appEvents.emit('orderError', 'ORD-102', 'Payment declined');
}, 800);

setTimeout(() => {
  console.log('Event-driven demo completed.');
}, 1000);
