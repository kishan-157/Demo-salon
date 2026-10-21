package com.bellarose.salon.owner

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

val CharcoalDark = Color(0xFF2D2A29)
val RosePrimary = Color(0xFF9E555A)
val RoseSecondary = Color(0xFFE2A3A6)
val BackgroundCream = Color(0xFFFCF9F6)
val TextDark = Color(0xFF2D2A29)
val TextMuted = Color(0xFF6A605E)

data class OwnerBooking(
    val id: String,
    val serviceName: String,
    val price: Double,
    val date: String,
    val timeSlot: String,
    val clientName: String,
    val clientPhone: String,
    val notes: String = "",
    var status: String = "pending"
)

data class OwnerService(
    val id: String,
    val name: String,
    val price: Double,
    val durationMinutes: Int,
    val category: String
)

enum class OwnerScreen {
    LOGIN, DASHBOARD, PENDING_REQUESTS, CONFIRMED, SCHEDULE,
    BOOKING_ACTION, SERVICES_MGMT, HOURS_MGMT, PROFILE_SETTINGS
}

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
                OwnerAppRoot()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OwnerAppRoot() {
    var currentScreen by remember { mutableStateOf(OwnerScreen.LOGIN) }
    var selectedBooking by remember { mutableStateOf<OwnerBooking?>(null) }
    val context = LocalContext.current

    var bookings by remember {
        mutableStateOf(
            listOf(
                OwnerBooking("br-101", "Signature Balayage & Gloss", 240.0, "2026-10-25", "10:00 AM", "Victoria Sinclair", "+1 (555) 234-5678", "Sensitive scalp", "confirmed"),
                OwnerBooking("br-102", "24K Gold Radiance Facial", 185.0, "2026-10-26", "2:00 PM", "Amanda Vance", "+1 (555) 987-6543", "Event preparation", "pending"),
                OwnerBooking("br-103", "Luxury Gel Manicure", 110.0, "2026-10-27", "11:30 AM", "Sophia Kensington", "+1 (555) 456-7890", "French tips", "pending")
            )
        )
    }

    var services by remember {
        mutableStateOf(
            listOf(
                OwnerService("h1", "Signature Balayage & Gloss", 240.0, 180, "hair"),
                OwnerService("h2", "Precision Cut & Styling", 95.0, 60, "hair"),
                OwnerService("s1", "24K Gold Radiance Facial", 185.0, 75, "skin"),
                OwnerService("b1", "Luxury Gel Manicure & Pedicure", 110.0, 90, "beauty")
            )
        )
    }

    Scaffold(
        bottomBar = {
            if (currentScreen != OwnerScreen.LOGIN) {
                NavigationBar(containerColor = Color.White) {
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.Dashboard, contentDescription = null) },
                        label = { Text("Overview", fontSize = 11.sp) },
                        selected = currentScreen == OwnerScreen.DASHBOARD,
                        onClick = { currentScreen = OwnerScreen.DASHBOARD }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.HourglassTop, contentDescription = null) },
                        label = { Text("Requests", fontSize = 11.sp) },
                        selected = currentScreen == OwnerScreen.PENDING_REQUESTS,
                        onClick = { currentScreen = OwnerScreen.PENDING_REQUESTS }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.CheckCircle, contentDescription = null) },
                        label = { Text("Confirmed", fontSize = 11.sp) },
                        selected = currentScreen == OwnerScreen.CONFIRMED,
                        onClick = { currentScreen = OwnerScreen.CONFIRMED }
                    )
                    NavigationBarItem(
                        icon = { Icon(Icons.Default.ContentCut, contentDescription = null) },
                        label = { Text("Services", fontSize = 11.sp) },
                        selected = currentScreen == OwnerScreen.SERVICES_MGMT,
                        onClick = { currentScreen = OwnerScreen.SERVICES_MGMT }
                    )
                }
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding).fillMaxSize().background(BackgroundCream)) {
            when (currentScreen) {
                OwnerScreen.LOGIN -> OwnerLoginScreen(
                    onLoginSuccess = { currentScreen = OwnerScreen.DASHBOARD }
                )
                OwnerScreen.DASHBOARD -> OwnerDashboardScreen(
                    bookings = bookings,
                    onNavigateToRequests = { currentScreen = OwnerScreen.PENDING_REQUESTS },
                    onNavigateToConfirmed = { currentScreen = OwnerScreen.CONFIRMED },
                    onSelectBooking = { b ->
                        selectedBooking = b
                        currentScreen = OwnerScreen.BOOKING_ACTION
                    }
                )
                OwnerScreen.PENDING_REQUESTS -> PendingRequestsScreen(
                    bookings = bookings.filter { it.status == "pending" },
                    onSelectBooking = { b ->
                        selectedBooking = b
                        currentScreen = OwnerScreen.BOOKING_ACTION
                    },
                    onQuickAccept = { id ->
                        bookings = bookings.map { if (it.id == id) it.copy(status = "confirmed") else it }
                    },
                    onQuickReject = { id ->
                        bookings = bookings.map { if (it.id == id) it.copy(status = "rejected") else it }
                    }
                )
                OwnerScreen.CONFIRMED -> ConfirmedAppointmentsScreen(
                    bookings = bookings.filter { it.status == "confirmed" },
                    onSelectBooking = { b ->
                        selectedBooking = b
                        currentScreen = OwnerScreen.BOOKING_ACTION
                    }
                )
                OwnerScreen.BOOKING_ACTION -> BookingActionScreen(
                    booking = selectedBooking ?: bookings.first(),
                    onBack = { currentScreen = OwnerScreen.DASHBOARD },
                    onUpdateStatus = { id, newStatus ->
                        bookings = bookings.map { if (it.id == id) it.copy(status = newStatus) else it }
                        currentScreen = OwnerScreen.DASHBOARD
                    },
                    onWhatsAppCustomer = { phone, service ->
                        val clean = phone.replace(Regex("[^0-9]"), "")
                        val url = "https://wa.me/$clean?text=Hello,%20this%20is%20Bella%20Rose%20Salon%20regarding%20your%20$service%20appointment."
                        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    }
                )
                OwnerScreen.SERVICES_MGMT -> ServiceManagementScreen(
                    services = services,
                    onUpdatePrice = { id, newPrice ->
                        services = services.map { if (it.id == id) it.copy(price = newPrice) else it }
                    }
                )
                else -> OwnerDashboardScreen(bookings = bookings, onNavigateToRequests = {}, onNavigateToConfirmed = {}, onSelectBooking = {})
            }
        }
    }
}

@Composable
fun OwnerLoginScreen(onLoginSuccess: () -> Unit) {
    var passcode by remember { mutableStateOf("") }
    Box(modifier = Modifier.fillMaxSize().background(CharcoalDark).padding(24.dp), contentAlignment = Alignment.Center) {
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Box(modifier = Modifier.size(64.dp).clip(CircleShape).background(RosePrimary), contentAlignment = Alignment.Center) {
                    Icon(Icons.Default.Security, contentDescription = null, tint = Color.White, modifier = Modifier.size(32.dp))
                }
                Text("Bella Rose Owner Portal", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextDark)
                Text("Sign in to manage bookings, approve appointments & edit salon settings.", fontSize = 12.sp, color = TextMuted)
                
                OutlinedTextField(
                    value = passcode,
                    onValueChange = { passcode = it },
                    label = { Text("Owner Passcode") },
                    placeholder = { Text("e.g. demo123") },
                    modifier = Modifier.fillMaxWidth()
                )

                Button(
                    onClick = onLoginSuccess,
                    colors = ButtonDefaults.buttonColors(containerColor = RosePrimary),
                    shape = RoundedCornerShape(50.dp),
                    modifier = Modifier.fillMaxWidth().height(48.dp)
                ) {
                    Text("Sign In as Owner")
                }

                Button(
                    onClick = onLoginSuccess,
                    colors = ButtonDefaults.buttonColors(containerColor = RoseLight),
                    shape = RoundedCornerShape(50.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Quick Demo Login (One Tap)", color = RosePrimary, fontSize = 12.sp)
                }
            }
        }
    }
}

@Composable
fun OwnerDashboardScreen(
    bookings: List<OwnerBooking>,
    onNavigateToRequests: () -> Unit,
    onNavigateToConfirmed: () -> Unit,
    onSelectBooking: (OwnerBooking) -> Unit
) {
    val pending = bookings.filter { it.status == "pending" }
    val confirmed = bookings.filter { it.status == "confirmed" }
    val totalRevenue = confirmed.sumOf { it.price }

    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = CharcoalDark),
                shape = RoundedCornerShape(20.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("BELLA ROSE CONCIERGE", color = RoseSecondary, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    Text("Salon Owner Dashboard", color = Color.White, fontSize = 22.sp, fontWeight = FontWeight.Bold)
                    Text("Estimated Today's Revenue: $${totalRevenue.toInt()}", color = Color.White.copy(alpha = 0.9f), fontSize = 14.sp)
                }
            }
        }

        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFFEF3C7)),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.weight(1f).clickable { onNavigateToRequests() }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("${pending.size}", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Color(0xFFB45309))
                        Text("Pending Requests", fontSize = 12.sp, color = Color(0xFFB45309))
                    }
                }
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFD1FAE5)),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.weight(1f).clickable { onNavigateToConfirmed() }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("${confirmed.size}", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Color(0xFF047857))
                        Text("Confirmed", fontSize = 12.sp, color = Color(0xFF047857))
                    }
                }
            }
        }

        item {
            Text("Recent Customer Booking Requests", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextDark)
        }

        items(bookings) { b ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth().clickable { onSelectBooking(b) }
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Column {
                        Text(b.serviceName, fontWeight = FontWeight.Bold, color = TextDark)
                        Text("${b.clientName} · ${b.date} at ${b.timeSlot}", fontSize = 12.sp, color = TextMuted)
                    }
                    Text(
                        b.status.uppercase(),
                        fontWeight = FontWeight.Bold,
                        fontSize = 11.sp,
                        color = if (b.status == "confirmed") Color(0xFF047857) else Color(0xFFB45309)
                    )
                }
            }
        }
    }
}

@Composable
fun PendingRequestsScreen(
    bookings: List<OwnerBooking>,
    onSelectBooking: (OwnerBooking) -> Unit,
    onQuickAccept: (String) -> Unit,
    onQuickReject: (String) -> Unit
) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text("Pending Appointment Requests", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
            Text("Review and confirm client bookings", fontSize = 12.sp, color = TextMuted)
        }
        if (bookings.isEmpty()) {
            item {
                Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(16.dp), modifier = Modifier.fillMaxWidth()) {
                    Box(modifier = Modifier.padding(32.dp).fillMaxWidth(), contentAlignment = Alignment.Center) {
                        Text("No pending requests! All bookings are processed.", color = TextMuted, fontSize = 13.sp)
                    }
                }
            }
        }
        items(bookings) { b ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth().clickable { onSelectBooking(b) }
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(b.serviceName, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = TextDark)
                    Text("Guest: ${b.clientName} (${b.clientPhone})", fontSize = 13.sp, color = TextDark)
                    Text("Requested: ${b.date} at ${b.timeSlot} ($${b.price.toInt()})", fontSize = 12.sp, color = TextMuted)
                    if (b.notes.isNotBlank()) {
                        Text("Note: ${b.notes}", fontSize = 12.sp, color = RosePrimary)
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End, verticalAlignment = Alignment.CenterVertically) {
                        OutlinedButton(onClick = { onQuickReject(b.id) }, colors = ButtonDefaults.outlinedButtonColors(contentColor = Color(0xFFDC2626))) {
                            Text("Reject", fontSize = 12.sp)
                        }
                        Spacer(Modifier.width(8.dp))
                        Button(onClick = { onQuickAccept(b.id) }, colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669))) {
                            Text("Confirm", fontSize = 12.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ConfirmedAppointmentsScreen(bookings: List<OwnerBooking>, onSelectBooking: (OwnerBooking) -> Unit) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text("Confirmed Salon Schedule", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
        }
        items(bookings) { b ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth().clickable { onSelectBooking(b) }
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Column {
                        Text(b.serviceName, fontWeight = FontWeight.Bold, color = TextDark)
                        Text("${b.clientName} · ${b.date} at ${b.timeSlot}", fontSize = 12.sp, color = TextMuted)
                    }
                    Text("$${b.price.toInt()}", fontWeight = FontWeight.Bold, color = RosePrimary)
                }
            }
        }
    }
}

@Composable
fun BookingActionScreen(
    booking: OwnerBooking,
    onBack: () -> Unit,
    onUpdateStatus: (String, String) -> Unit,
    onWhatsAppCustomer: (String, String) -> Unit
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(onClick = onBack) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Back")
        }
        Text("Manage Appointment #${booking.id}", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextDark)
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(20.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text(booking.serviceName, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextDark)
                Text("Price: $${booking.price.toInt()}", fontWeight = FontWeight.SemiBold, color = RosePrimary)
                Text("Client: ${booking.clientName}", fontSize = 14.sp)
                Text("Phone: ${booking.clientPhone}", fontSize = 14.sp)
                Text("Date & Slot: ${booking.date} at ${booking.timeSlot}", fontSize = 14.sp)
                Text("Current Status: ${booking.status.uppercase()}", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            }
        }

        Button(
            onClick = { onWhatsAppCustomer(booking.clientPhone, booking.serviceName) },
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
            shape = RoundedCornerShape(50.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Message Client on WhatsApp")
        }

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Button(
                onClick = { onUpdateStatus(booking.id, "confirmed") },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669)),
                shape = RoundedCornerShape(50.dp),
                modifier = Modifier.weight(1f)
            ) {
                Text("Confirm")
            }
            Button(
                onClick = { onUpdateStatus(booking.id, "rejected") },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626)),
                shape = RoundedCornerShape(50.dp),
                modifier = Modifier.weight(1f)
            ) {
                Text("Reject")
            }
        }
    }
}

@Composable
fun ServiceManagementScreen(services: List<OwnerService>, onUpdatePrice: (String, Double) -> Unit) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Text("Approved Services & Pricing", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = TextDark)
            Text("Salon services synchronized with customer booking app", fontSize = 12.sp, color = TextMuted)
        }
        items(services) { s ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Column {
                        Text(s.name, fontWeight = FontWeight.Bold, color = TextDark)
                        Text("${s.durationMinutes} mins · Category: ${s.category}", fontSize = 12.sp, color = TextMuted)
                    }
                    Text("$${s.price.toInt()}", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = RosePrimary)
                }
            }
        }
    }
}
