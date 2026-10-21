package com.bellarose.salon.customer.model

data class ServiceItem(
    val id: String,
    val name: String,
    val category: String,
    val description: String,
    val price: Double,
    val durationMinutes: Int,
    val image: String,
    val popular: Boolean = false
)

data class BookingRequest(
    val id: String? = null,
    val serviceId: String,
    val serviceName: String,
    val price: Double,
    val date: String,
    val timeSlot: String,
    val clientName: String,
    val clientPhone: String,
    val clientEmail: String? = null,
    val notes: String? = null,
    val status: String = "pending",
    val createdAt: String? = null
)

data class AvailabilityResponse(
    val date: String,
    val allSlots: List<String>,
    val bookedSlots: List<String>,
    val availableSlots: List<String>
)

data class SalonInfo(
    val name: String,
    val tagline: String,
    val subheading: String,
    val phone: String,
    val displayPhone: String,
    val whatsappNumber: String,
    val email: String,
    val address: AddressInfo
)

data class AddressInfo(
    val street: String,
    val city: String,
    val state: String,
    val zip: String,
    val full: String
)
