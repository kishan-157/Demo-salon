package com.bellarose.salon.customer.network

import com.bellarose.salon.customer.model.*
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface ApiService {
    @GET("/api/salon")
    suspend fun getSalonInfo(): Response<SalonInfo>

    @GET("/api/services")
    suspend fun getServices(): Response<List<ServiceItem>>

    @GET("/api/availability")
    suspend fun getAvailability(@Query("date") date: String): Response<AvailabilityResponse>

    @GET("/api/bookings")
    suspend fun getMyBookings(@Query("phone") phone: String): Response<List<BookingRequest>>

    @POST("/api/bookings")
    suspend fun createBooking(@Body booking: BookingRequest): Response<BookingRequest>

    @POST("/api/bookings/{id}/cancel")
    suspend fun cancelBooking(
        @Path("id") id: String,
        @Body body: Map<String, String>
    ): Response<Map<String, Any>>

    companion object {
        private const val BASE_URL = "https://your-salon-domain.com/" // Set to the backend API host

        fun create(): ApiService {
            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ApiService::class.java)
        }
    }
}
