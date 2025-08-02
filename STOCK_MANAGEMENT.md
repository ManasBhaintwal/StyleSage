# Stock Management Implementation

## Overview

This implementation provides automatic stock reduction when orders are placed and payment is verified. It includes real-time stock validation, low stock warnings, and proper error handling.

## Features

### 🔄 **Automatic Stock Reduction**

- Stock is automatically reduced when payment is verified
- Supports size-specific stock management
- Prevents overselling with pre-order validation

### ✅ **Pre-Order Validation**

- Validates stock availability before creating orders
- Returns detailed error messages for out-of-stock items
- Prevents order creation if insufficient stock

### 📊 **Real-time Stock Checking**

- Live stock validation in add-to-cart components
- Automatic stock refresh when size changes
- Visual indicators for low stock and out-of-stock items

### 🚨 **Stock Warnings**

- "Only X left!" warnings for low stock (≤5 items)
- Out-of-stock prevention in cart
- Real-time stock status updates

### 🔧 **Order Cancellation**

- Automatic stock restoration when orders are cancelled
- Only restores stock for confirmed orders
- Proper error handling for stock restoration

## Implementation Details

### **Stock Utilities (`lib/stock-utils.ts`)**

#### Functions:

- `validateStock(items)` - Validates if sufficient stock exists for order items
- `reduceStock(items)` - Reduces stock quantities when orders are confirmed
- `restoreStock(items)` - Restores stock when orders are cancelled
- `getCurrentStock(productId, size)` - Gets current stock for specific product/size

### **API Endpoints**

#### `/api/checkout` (Modified)

- Added stock validation before order creation
- Returns detailed out-of-stock information
- Prevents order creation if insufficient stock

#### `/api/checkout/verify` (Modified)

- Automatically reduces stock when payment is verified
- Logs stock reduction results
- Continues order confirmation even if stock reduction has minor errors

#### `/api/orders/cancel` (New)

- Cancels orders and restores stock
- Only works for non-shipped orders
- Proper validation for cancellation eligibility

#### `/api/products/stock` (New)

- Returns current stock for specific product/size combination
- Used for real-time stock checking

### **Frontend Components**

#### **Stock Check Hook (`hooks/use-stock-check.ts`)**

```typescript
const { stock, isLoading, error } = useStockCheck(productId, size, enabled);
```

#### **Enhanced AddToCart Component**

- Real-time stock validation
- Visual stock warnings
- Disabled state for out-of-stock items
- Loading states during stock checks

#### **Enhanced Checkout Process**

- Pre-payment stock validation
- User-friendly error messages for stock issues
- Automatic redirect to cart if items are out of stock

## Database Schema Updates

### **Order Model**

Added cancellation tracking:

```typescript
cancelReason?: string;
cancelledAt?: Date;
```

### **Product Stock Structure**

Stock is stored as a map by size:

```typescript
stock: { [size: string]: number }
// Example: { "S": 10, "M": 15, "L": 8, "XL": 5 }
```

## Usage Examples

### **For Users:**

1. Browse products with real-time stock indicators
2. See "Only X left!" warnings for low stock items
3. Cannot add out-of-stock items to cart
4. Receive clear error messages if cart items become unavailable during checkout

### **For Admins:**

1. Stock automatically reduces when orders are confirmed
2. Monitor stock levels in admin dashboard
3. Stock is restored if orders are cancelled
4. Real-time stock tracking across all product sizes

### **Error Handling:**

- Graceful degradation if stock check fails
- Detailed logging for debugging
- User-friendly error messages
- Fallback to static stock data if real-time check fails

## Technical Flow

### **Order Placement Flow:**

1. User clicks "Proceed to Checkout"
2. System validates stock for all cart items
3. If insufficient stock → Show error, redirect to cart
4. If stock OK → Create order and proceed to payment
5. On payment success → Verify payment AND reduce stock
6. Order confirmed with updated stock levels

### **Stock Validation Flow:**

1. Real-time stock check when product page loads
2. Stock revalidation when size is changed
3. Stock validation before adding to cart
4. Final stock validation before order creation
5. Stock reduction after payment confirmation

### **Cancellation Flow:**

1. User requests order cancellation
2. System checks if order can be cancelled
3. If eligible → Cancel order AND restore stock
4. Stock levels updated in real-time

## Configuration

### **Environment Variables**

No additional environment variables required. Uses existing MongoDB and Razorpay configuration.

### **Stock Thresholds**

- Low stock warning: ≤ 5 items
- Out of stock: 0 items
- These can be easily modified in the components

## Benefits

- ✅ Prevents overselling
- ✅ Real-time stock awareness
- ✅ Better user experience
- ✅ Automatic inventory management
- ✅ Proper error handling
- ✅ Stock restoration on cancellations
- ✅ Size-specific stock tracking
- ✅ Scalable architecture

## Future Enhancements

- Stock reservation during checkout process
- Bulk stock management tools
- Stock history tracking
- Low stock email alerts
- Integration with external inventory systems
- Advanced stock analytics

## Testing

Test the implementation by:

1. Adding items to cart with different sizes
2. Placing orders and verifying stock reduction
3. Cancelling orders and verifying stock restoration
4. Testing out-of-stock scenarios
5. Validating real-time stock updates
