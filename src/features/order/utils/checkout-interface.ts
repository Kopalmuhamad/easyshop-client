export interface ICheckoutResponse {
  message: string; // Pesan respons
  data: ICheckoutData[]; // Data order
}

export interface ICheckoutData {
  _id: string; // ID order
  userId: string; // ID user
  orderId: string; // Nomor order
  customerDetails: ICustomerDetails; // Informasi pelanggan
  paymentDetails: IPaymentDetails; // Detail pembayaran
  products: IProductDetails[]; // Daftar produk yang dipesan
  createdAt: string; // Tanggal order dibuat
  updatedAt: string; // Tanggal order diperbarui
  __v: number; // Versi dokumen (MongoDB)
}

export interface ICustomerDetails {
  firstName: string; // Nama depan
  lastName: string; // Nama belakang
  username: string; // Username pelanggan
  email: string; // Email pelanggan
  phone: string; // Nomor telepon pelanggan
  shippingDetails: IShippingDetails; // Detail alamat pengiriman
}

export interface IShippingDetails {
  detail: string; // Detail alamat
  subDistrict: string; // Kecamatan
  district: string; // Kota/Kabupaten
  city: string; // Kota
  province: string; // Provinsi
  postalCode: string; // Kode pos
  country: string; // Negara
  shippingStatus: string; // Status pengiriman
}

export interface IPaymentDetails {
  paymentType: string; // Jenis pembayaran (contoh: "bank_transfer")
  bankName: string; // Nama bank
  totalAmount: number; // Jumlah total pembayaran
  paymentStatus: string; // Status pembayaran
  vaNumber: string; // Nomor virtual account (VA)
  transactionTime: string; // Waktu transaksi
  transactionExpiration: string; // Waktu kedaluwarsa transaksi
  billKey: string; // Kode tagihan
  billCode: string; // Kode tagihan
  permataVaNumber: string; // Nomor VA Permata
}

export interface IProductDetails {
  productId: string; // ID produk
  name: string; // Nama produk
  price: number; // Harga per unit
  quantity: number; // Jumlah yang dipesan
  _id: string; // ID internal item produk
}
