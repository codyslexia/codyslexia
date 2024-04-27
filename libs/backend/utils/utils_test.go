package utils

import (
	"os"
	"testing"
)

func TestAnsiColors(t *testing.T) {
	// Test BLACK color
	if BLACK != "\033[0;30m" {
		t.Error("Expected BLACK to be '\033[0;30m'")
	}

	// Test RED color
	if RED != "\033[0;31m" {
		t.Error("Expected RED to be '\033[0;31m'")
	}

	// Test GREEN color
	if GREEN != "\033[0;32m" {
		t.Error("Expected GREEN to be '\033[0;32m'")
	}

	// Test BROWN color
	if BROWN != "\033[0;33m" {
		t.Error("Expected BROWN to be '\033[0;33m'")
	}

	// Test BLUE color
	if BLUE != "\033[0;34m" {
		t.Error("Expected BLUE to be '\033[0;34m'")
	}

	// Test PURPLE color
	if PURPLE != "\033[0;35m" {
		t.Error("Expected PURPLE to be '\033[0;35m'")
	}

	// Test CYAN color
	if CYAN != "\033[0;36m" {
		t.Error("Expected CYAN to be '\033[0;36m'")
	}

	// Test LIGHT_GRAY color
	if LIGHT_GRAY != "\033[0;37m" {
		t.Error("Expected LIGHT_GRAY to be '\033[0;37m'")
	}

	// Test DARK_GRAY color
	if DARK_GRAY != "\033[1;30m" {
		t.Error("Expected DARK_GRAY to be '\033[1;30m'")
	}

	// Test LIGHT_RED color
	if LIGHT_RED != "\033[1;31m" {
		t.Error("Expected LIGHT_RED to be '\033[1;31m'")
	}

	// Test LIGHT_GREEN color
	if LIGHT_GREEN != "\033[1;32m" {
		t.Error("Expected LIGHT_GREEN to be '\033[1;32m'")
	}

	// Test YELLOW color
	if YELLOW != "\033[1;33m" {
		t.Error("Expected YELLOW to be '\033[1;33m'")
	}

	// Test LIGHT_BLUE color
	if LIGHT_BLUE != "\033[1;34m" {
		t.Error("Expected LIGHT_BLUE to be '\033[1;34m'")
	}

	// Test LIGHT_PURPLE color
	if LIGHT_PURPLE != "\033[1;35m" {
		t.Error("Expected LIGHT_PURPLE to be '\033[1;35m'")
	}

	// Test LIGHT_CYAN color
	if LIGHT_CYAN != "\033[1;36m" {
		t.Error("Expected LIGHT_CYAN to be '\033[1;36m'")
	}

	// Test LIGHT_WHITE color
	if LIGHT_WHITE != "\033[1;37m" {
		t.Error("Expected LIGHT_WHITE to be '\033[1;37m'")
	}

	// Test BOLD color
	if BOLD != "\033[1m" {
		t.Error("Expected BOLD to be '\033[1m'")
	}

	// Test FAINT color
	if FAINT != "\033[2m" {
		t.Error("Expected FAINT to be '\033[2m'")
	}

	// Test ITALIC color
	if ITALIC != "\033[3m" {
		t.Error("Expected ITALIC to be '\033[3m'")
	}

	// Test UNDERLINE color
	if UNDERLINE != "\033[4m" {
		t.Error("Expected UNDERLINE to be '\033[4m'")
	}

	// Test BLINK color
	if BLINK != "\033[5m" {
		t.Error("Expected BLINK to be '\033[5m'")
	}

	// Test NEGATIVE color
	if NEGATIVE != "\033[7m" {
		t.Error("Expected NEGATIVE to be '\033[7m'")
	}

	// Test CROSSED color
	if CROSSED != "\033[9m" {
		t.Error("Expected CROSSED to be '\033[9m'")
	}

	// Test RESET color
	if RESET != "\033[0m" {
		t.Error("Expected RESET to be '\033[0m'")
	}
}

func TestColorize(t *testing.T) {
	input := "Hello, World!"
	targets := []string{"Hello", "World"}
	color := GREEN
	expectedOutput := "Hello, World!"

	output := Colorize(input, targets, color)

	if output != expectedOutput {
		t.Errorf("Expected output to be '%s', but got '%s'", expectedOutput, output)
	}
}

func TestGetEnvVar(t *testing.T) {
	// Test when environment variable exists
	key := "EXISTING_VAR"
	fallback := "fallback_value"
	expectedValue := "existing_value"
	os.Setenv(key, expectedValue)

	result := GetEnvVar(key, fallback)

	if result != expectedValue {
		t.Errorf("Expected result to be '%s', but got '%s'", expectedValue, result)
	}

	// Test when environment variable does not exist
	key = "NON_EXISTING_VAR"
	expectedValue = fallback
	os.Unsetenv(key)

	result = GetEnvVar(key, fallback)

	if result != expectedValue {
		t.Errorf("Expected result to be '%s', but got '%s'", expectedValue, result)
	}
}
