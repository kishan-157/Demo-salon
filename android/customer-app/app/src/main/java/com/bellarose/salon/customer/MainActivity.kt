package com.bellarose.salon.customer

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.bellarose.salon.customer.model.BookingRequest
import com.bellarose.salon.customer.model.ServiceItem
import kotlinx.coroutines.delay

val RosePrimary = Color(0xFF9E555A)
val RoseSecondary = Color(0xFFE2A3A6)
val RoseLight = Color(0xFFF9F3F0)
val BackgroundCream = Color(0xFFFCF9F6)
val TextDark = Color(0xFF2D2A29)
val TextMuted = Color(0xFF6A605E)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(
                colorScheme = lightColorScheme(
                    primary = RosePrimary,
                    secondary = RoseSecondary,
                    background = BackgroundCream,
                    surface = Color.White
                )
            ) {
                CustomerAppRoot()
            }
        }
    }
}

enum class CustomerScreen {
    SPLASH, HOME, SERVICES, SERVICE_DETAIL, BOOKING, BOOKING_SUMMARY,
    BOOKING_CONFIRMATION, MY_BOOKINGS, BOOKING_DETAIL, LOCATION_CONTACT, PROFILE
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomerAppRoot() {
    var currentScreen by remember { mutableStateOf(CustomerScreen.SPLASH) }
    var selectedService by remember { mutableStateOf<ServiceItem?>(null) }
    var selectedBooking by remember { mutableStateOf<BookingRequest?>(null) }
    val context = LocalContext.current

    // Sample data initialized for demonstration
    val services = remember {
        listOf(
            ServiceItem("h1", "Signature Balayage & Gloss", "hair", "Custom hand-painted dimensional highlights paired with gloss treatment.", 240.0, 180, "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80", true),
            ServiceItem("h2", "Precision Cut & Styling", "hair", "Consultation, precision haircut tailored to facial structure, blowout finish.", 95.0, 60, "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"),
            ServiceItem("s1", "24K Gold Radiance Facial", "skin", "Anti-aging facial incorporating 24K gold micro-particles and lymphatic massage.", 185.0, 75, "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", true),
            ServiceItem("b1", "Luxury Gel Manicure & Pedicure", "beauty", "Nail shaping, cuticle treatment, massage, and long-wear gel polish.", 110.0, 90, "https://images.unsplash.com/photo-1632345031435-877ff6c2ae8d?auto=format&fit=crop&w=800&q=80")
        )
    }

    var bookings by remember {
        mutableStateOf(
            listOf(
                BookingRequest("br-101", "h1", "Signature Balayage & Gloss", 240.0, "2026-10-25", "10:00 AM", "Victoria Sinclair", "+1 (555) 234-5678", "victoria@example.com", "Sensitive scalp", "confirmed", "2026-10-18T14:30:00Z"),
                BookingRequest("br-102", "s1", "24K Gold Radiance Facial", 185.0, "2026-10-26", "2:00 PM", "Amanda Vance", "+1 (555) 987-6543", "amanda@example.com", "Preparing for event", "pending", "2026-10-20T09:15:00Z")
            )
        )
    }

    // Auto navigate from Splash to Home after 1.8 seconds
    LaunchedEffect(currentScreen) {
        if (currentScreen == CustomerScreen.SPLASH) {
            delay(1800)
            currentScreen = CustomerScreen.HOME
        }
    }

    Scaffold(
        bottomBar = {
            if (currentScreen != CustomerScreen.SPLASH) {
                NavigationBar(containerColor = Color.White) {
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                        label = { Text("Home", fontSize = 11.sp) },
                        selected = currentScreen == CustomerScreen.HOME,
                        onClick = { currentScreen = CustomerScreen.HOME }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Spa, contentDescription = "Services") },
                        label = { Text("Services", fontSize = 11.sp) },
                        selected = currentScreen == CustomerScreen.SERVICES,
                        onClick = { currentScreen = CustomerScreen.SERVICES }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.CalendarToday, contentDescription = "Bookings") },
                        label = { Text("My Bookings", fontSize = 11.sp) },
                        selected = currentScreen == CustomerScreen.MY_BOOKINGS,
                        onClick = { currentScreen = CustomerScreen.MY_BOOKINGS }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.LocationOn, contentDescription = "Contact") },
                        label = { Text("Salon", fontSize = 11.sp) },
                        selected = currentScreen == CustomerScreen.LOCATION_CONTACT,
                        onClick = { currentScreen = CustomerScreen.LOCATION_CONTACT }
                    )
                }
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding).fillMaxSize().background(BackgroundCream)) {
            when (currentScreen) {
                CustomerScreen.SPLASH -> SplashScreen()
                CustomerScreen.HOME -> HomeScreen(
                    onExploreServices = { currentScreen = CustomerScreen.SERVICES },
                    onSelectService = { s ->
                        selectedService = s
                        currentScreen = CustomerScreen.SERVICE_DETAIL
                    },
                    onBookNow = {
                        selectedService = services.first()
                        currentScreen = CustomerScreen.BOOKING
                    }
                )
                CustomerScreen.SERVICES -> ServicesScreen(
                    services = services,
                    onSelectService = { s ->
                        selectedService = s
                        currentScreen = CustomerScreen.SERVICE_DETAIL
                    }
                )
                CustomerScreen.SERVICE_DETAIL -> ServiceDetailScreen(
                    service = selectedService ?: services.first(),
                    onBack = { currentScreen = CustomerScreen.SERVICES },
                    onBook = { currentScreen = CustomerScreen.BOOKING }
                )
                CustomerScreen.BOOKING -> BookingScreen(
                    service = selectedService ?: services.first(),
                    onBack = { currentScreen = CustomerScreen.SERVICE_DETAIL },
                    onSubmitBooking = { booking ->
                        bookings = listOf(booking) + bookings
                        selectedBooking = booking
                        currentScreen = CustomerScreen.BOOKING_CONFIRMATION
                    }
                )
                CustomerScreen.BOOKING_CONFIRMATION -> BookingConfirmationScreen(
                    booking = selectedBooking ?: bookings.first(),
                    onGoToBookings = { currentScreen = CustomerScreen.MY_BOOKINGS },
                    onOpenWhatsApp = {
                        val url = "https://wa.me/15553829400?text=Hello%20Bella%20Rose,%20I%20have%20submitted%20booking%20${selectedBooking?.id}"
                        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    }
                )
                CustomerScreen.MY_BOOKINGS -> MyBookingsScreen(
                    bookings = bookings,
                    onSelectBooking = { b ->
                        selectedBooking = b
                        currentScreen = CustomerScreen.BOOKING_DETAIL
                    },
                    onNewBooking = { currentScreen = CustomerScreen.SERVICES }
                )
                CustomerScreen.BOOKING_DETAIL -> BookingDetailScreen(
                    booking = selectedBooking ?: bookings.first(),
                    onBack = { currentScreen = CustomerScreen.MY_BOOKINGS },
                    onCancelBooking = { id ->
                        bookings = bookings.map { if (it.id == id) it.copy(status = "cancelled") else it }
                        currentScreen = CustomerScreen.MY_BOOKINGS
                    }
                )
                CustomerScreen.LOCATION_CONTACT -> LocationContactScreen(
                    onOpenWhatsApp = {
                        val url = "https://wa.me/15553829400"
                        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    }
                )
                else -> HomeScreen(onExploreServices = {}, onSelectService = {}, onBookNow = {})
            }
        }
    }
}

@Composable
fun SplashScreen() {
    Box(
        modifier = Modifier.fillMaxSize().background(RosePrimary),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(
                modifier = Modifier.size(90.dp).clip(CircleShape).background(Color.White.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Text("BR", color = Color.White, fontSize = 36.sp, fontWeight = FontWeight.Bold)
            }
            Text("Bella Rose", color = Color.White, fontSize = 28.sp, fontWeight = FontWeight.Bold)
            Text("LUXURY SALON & SPA", color = RoseSecondary, fontSize = 12.sp, letterSpacing = 2.sp)
        }
    }
}

@Composable
fun HomeScreen(
    onExploreServices: () -> Unit,
    onSelectService: (ServiceItem) -> Unit,
    onBookNow: () -> Unit
) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(20.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = RosePrimary),
                shape = RoundedCornerShape(24.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("BEVERLY HILLS", color = RoseSecondary, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, letterSpacing = 1.sp)
                    Text("Where Elegance Meets Artisanal Beauty", color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
                    Text("Bespoke hair couture, rejuvenating skin therapies & bridal artistry.", color = Color.White.copy(alpha = 0.9f), fontSize = 13.sp)
                    Button(
                        onClick = onBookNow,
                        colors = ButtonDefaults.buttonColors(containerColor = Color.White),
                        shape = RoundedCornerShape(50.dp)
                    ) {
                        Text("Book Appointment", color = RosePrimary, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text("Popular Treatments", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextDark)
                TextButton(onClick = onExploreServices) {
                    Text("View All", color = RosePrimary, fontSize = 12.sp)
                }
            }
        }
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(20.dp),
                modifier = Modifier.fillMaxWidth().clickable { onBookNow() }
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    Box(modifier = Modifier.size(60.dp).clip(RoundedCornerShape(12.dp)).background(RoseLight), contentAlignment = Alignment.Center) {
                        Icon(Icons.Default.Spa, contentDescription = null, tint = RosePrimary)
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text("Signature Balayage & Gloss", fontWeight = FontWeight.Bold, color = TextDark)
                        Text("3 hrs · Master Stylist", fontSize = 12.sp, color = TextMuted)
                        Text("$240.00", fontWeight = FontWeight.Bold, color = RosePrimary, fontSize = 14.sp)
                    }
                    Button(onClick = onBookNow, colors = ButtonDefaults.buttonColors(containerColor = RosePrimary)) {
                        Text("Book", fontSize = 12.sp)
                    }
                }
            }
        }
    }
}

@Composable
fun ServicesScreen(services: List<ServiceItem>, onSelectService: (ServiceItem) -> Unit) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text("Curated Salon Menu", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
            Text("Approved artisanal treatments and transparent pricing", fontSize = 12.sp, color = TextMuted)
        }
        items(services) { service ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(20.dp),
                modifier = Modifier.fillMaxWidth().clickable { onSelectService(service) }
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(service.name, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = TextDark)
                        Text("$${service.price.toInt()}", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = RosePrimary)
                    }
                    Text(service.description, fontSize = 12.sp, color = TextMuted)
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Schedule, contentDescription = null, tint = RosePrimary, modifier = Modifier.size(14.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("${service.durationMinutes} minutes", fontSize = 12.sp, color = TextMuted)
                    }
                }
            }
        }
    }
}

@Composable
fun ServiceDetailScreen(service: ServiceItem, onBack: () -> Unit, onBook: () -> Unit) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(onClick = onBack) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Back")
        }
        Text(service.name, fontSize = 24.sp, fontWeight = FontWeight.Bold, color = TextDark)
        Text("$${service.price.toInt()}", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = RosePrimary)
        Text(service.description, fontSize = 14.sp, color = TextMuted)
        Text("Duration: ${service.durationMinutes} mins", fontSize = 13.sp, color = TextDark)
        Spacer(Modifier.weight(1f))
        Button(
            onClick = onBook,
            colors = ButtonDefaults.buttonColors(containerColor = RosePrimary),
            shape = RoundedCornerShape(50.dp),
            modifier = Modifier.fillMaxWidth().height(52.dp)
        ) {
            Text("Select Date & Time", fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun BookingScreen(
    service: ServiceItem,
    onBack: () -> Unit,
    onSubmitBooking: (BookingRequest) -> Unit
) {
    var clientName by remember { mutableStateOf("") }
    var clientPhone by remember { mutableStateOf("") }
    var selectedDate by remember { mutableStateOf("2026-10-25") }
    var selectedSlot by remember { mutableStateOf("10:00 AM") }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        IconButton(onClick = onBack) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Back")
        }
        Text("Book ${service.name}", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextDark)
        Text("Selected Date: $selectedDate at $selectedSlot", fontSize = 13.sp, color = RosePrimary)
        
        OutlinedTextField(
            value = clientName,
            onValueChange = { clientName = it },
            label = { Text("Your Full Name") },
            modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = clientPhone,
            onValueChange = { clientPhone = it },
            label = { Text("Phone Number") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.weight(1f))
        Button(
            onClick = {
                val newReq = BookingRequest(
                    id = "br-${(1000..9999).random()}",
                    serviceId = service.id,
                    serviceName = service.name,
                    price = service.price,
                    date = selectedDate,
                    timeSlot = selectedSlot,
                    clientName = if (clientName.isBlank()) "Guest Client" else clientName,
                    clientPhone = if (clientPhone.isBlank()) "+1 555-0199" else clientPhone,
                    status = "pending"
                )
                onSubmitBooking(newReq)
            },
            colors = ButtonDefaults.buttonColors(containerColor = RosePrimary),
            shape = RoundedCornerShape(50.dp),
            modifier = Modifier.fillMaxWidth().height(52.dp)
        ) {
            Text("Submit Booking Request", fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun BookingConfirmationScreen(
    booking: BookingRequest,
    onGoToBookings: () -> Unit,
    onOpenWhatsApp: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier.size(80.dp).clip(CircleShape).background(Color(0xFFFEF3C7)),
            contentAlignment = Alignment.Center
        ) {
            Icon(Icons.Default.Schedule, contentDescription = null, tint = Color(0xFFD97706), modifier = Modifier.size(40.dp))
        }
        Spacer(Modifier.height(16.dp))
        Text("Booking Request Submitted", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextDark)
        Text("Status: Pending Salon Confirmation", fontSize = 14.sp, color = Color(0xFFD97706), fontWeight = FontWeight.SemiBold)
        Spacer(Modifier.height(8.dp))
        Text("Request ID: ${booking.id}\n${booking.serviceName} on ${booking.date} at ${booking.timeSlot}", textAlign = TextAlign.Center, fontSize = 13.sp, color = TextMuted)
        
        Spacer(Modifier.height(24.dp))
        Button(
            onClick = onOpenWhatsApp,
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
            shape = RoundedCornerShape(50.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Speed Up Confirmation via WhatsApp", color = Color.White)
        }
        Spacer(Modifier.height(12.dp))
        OutlinedButton(
            onClick = onGoToBookings,
            shape = RoundedCornerShape(50.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("View in My Bookings")
        }
    }
}

@Composable
fun MyBookingsScreen(
    bookings: List<BookingRequest>,
    onSelectBooking: (BookingRequest) -> Unit,
    onNewBooking: () -> Unit
) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text("My Appointments", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
            Text("Real-time booking status synchronized with salon", fontSize = 12.sp, color = TextMuted)
        }
        items(bookings) { booking ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(20.dp),
                modifier = Modifier.fillMaxWidth().clickable { onSelectBooking(booking) }
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(booking.serviceName, fontWeight = FontWeight.Bold, color = TextDark)
                        Text(
                            booking.status.uppercase(),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = when (booking.status) {
                                "confirmed" -> Color(0xFF059669)
                                "rejected" -> Color(0xFFDC2626)
                                "cancelled" -> Color(0xFF6B7280)
                                else -> Color(0xFFD97706)
                            }
                        )
                    }
                    Text("Date: ${booking.date} at ${booking.timeSlot}", fontSize = 12.sp, color = TextMuted)
                    Text("Estimated: $${booking.price.toInt()}", fontSize = 12.sp, color = RosePrimary, fontWeight = FontWeight.SemiBold)
                }
            }
        }
        item {
            Button(
                onClick = onNewBooking,
                colors = ButtonDefaults.buttonColors(containerColor = RosePrimary),
                shape = RoundedCornerShape(50.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Book Another Appointment")
            }
        }
    }
}

@Composable
fun BookingDetailScreen(
    booking: BookingRequest,
    onBack: () -> Unit,
    onCancelBooking: (String) -> Unit
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(onClick = onBack) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Back")
        }
        Text("Booking Details", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(20.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Reference: ${booking.id}", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = RosePrimary)
                Text("Service: ${booking.serviceName}", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = TextDark)
                Text("Date & Time: ${booking.date} at ${booking.timeSlot}", fontSize = 13.sp)
                Text("Client Name: ${booking.clientName}", fontSize = 13.sp)
                Text("Status: ${booking.status.replaceFirstChar { it.uppercase() }}", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            }
        }
        if (booking.status != "cancelled") {
            Button(
                onClick = { onCancelBooking(booking.id ?: "") },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626)),
                shape = RoundedCornerShape(50.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Cancel Appointment Request")
            }
        }
    }
}

@Composable
fun LocationContactScreen(onOpenWhatsApp: () -> Unit) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Salon Sanctuary", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(20.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Bella Rose Luxury Salon & Spa", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = TextDark)
                Text("482 Grand Avenue, Suite 100\nBeverly Hills, CA 90210", fontSize = 13.sp, color = TextMuted)
                Text("Hours: Mon-Sat 9AM-8PM, Sun 10AM-5PM", fontSize = 13.sp, color = TextMuted)
                Text("Valet Parking: Complimentary for guests", fontSize = 12.sp, color = RosePrimary, fontWeight = FontWeight.SemiBold)
            }
        }
        Button(
            onClick = onOpenWhatsApp,
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
            shape = RoundedCornerShape(50.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Icon(Icons.Default.Phone, contentDescription = null, tint = Color.White)
            Spacer(Modifier.width(8.dp))
            Text("Chat with Concierge on WhatsApp", color = Color.White)
        }
    }
}
