package com.beato.userauth

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.beato.userauth.databinding.ActivityDashboardBinding
import com.beato.userauth.network.RetrofitClient
import com.beato.userauth.utils.TokenManager
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDashboardBinding
    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        tokenManager = TokenManager(this)

        loadUserProfile()

        binding.settingsButton.setOnClickListener {
            showSettingsDialog()
        }
    }

    private fun loadUserProfile() {
        val token = tokenManager.getToken()
        if (token == null) {
            navigateToLogin()
            return
        }

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getUserProfile("Bearer $token")

                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!
                    binding.welcomeText.text = "Welcome, ${user.firstName} ${user.lastName}!"
                    binding.nameText.text = "${user.firstName} ${user.lastName}"
                    binding.emailText.text = user.email
                    binding.usernameText.text = user.username
                } else {
                    Toast.makeText(this@DashboardActivity, "Failed to load profile", Toast.LENGTH_SHORT).show()
                    tokenManager.clearAll()
                    navigateToLogin()
                }
            } catch (e: Exception) {
                Toast.makeText(this@DashboardActivity, "Error: ${e.message}", Toast.LENGTH_LONG).show()
                e.printStackTrace()
            }
        }
    }

    private fun showSettingsDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Settings")
        builder.setMessage("Do you want to logout?")
        builder.setPositiveButton("Logout") { dialog, _ ->
            logout()
            dialog.dismiss()
        }
        builder.setNegativeButton("Cancel") { dialog, _ ->
            dialog.dismiss()
        }
        builder.show()
    }

    private fun logout() {
        tokenManager.clearAll()
        Toast.makeText(this, "Logged out successfully", Toast.LENGTH_SHORT).show()
        navigateToLogin()
    }

    private fun navigateToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}