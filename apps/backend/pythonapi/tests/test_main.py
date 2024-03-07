"""Main unit test module."""


from pythonapi.main import get_books, get_status, not_found, books


def test_get_books():
    """Test the get_books function."""
    response = get_books().json
    assert response["books"] == books


def test_get_status():
    """Test the get_status function."""
    response = get_status().json
    assert response["app"] == "pythonapi"
    assert response["version"] == "1.0.0"
    assert response["timestamp"] is not None


def test_not_found():
    """Test the not_found function."""
    response = not_found("test").json
    assert response["code"] == 404
    assert response["message"] == "Path Not Found: '/test'"
