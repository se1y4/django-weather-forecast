$(document).ready(function() {
    $('#id_city').on('input', function() {
        let query = $(this).val();
        if (query.length > 2) {
            $.ajax({
                url: '/autocomplete/',
                data: { q: query },
                success: function(data) {
                    let suggestions = data;
                    $('#suggestions').empty();
                    if (suggestions.length) {
                        suggestions.forEach(function(suggestion) {
                            $('#suggestions').append('<div class="suggestion-item">' +
                                suggestion.city + ' (' + suggestion.city_rus + ')</div>');
                        });
                        $('.suggestion-item').on('click', function() {
                            $('#id_city').val($(this).text().split(' (')[0]);
                            $('#suggestions').empty();
                        });
                    }
                }
            });
        } else {
            $('#suggestions').empty();
        }
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#suggestions, #id_city').length) {
            $('#suggestions').empty();
        }
    });

    if (document.querySelector('.weather-info')) {
        document.querySelector('.back-button').style.display = 'block';
    }
    $('.get-location-button').on('click', function() {
        if (navigator.geolocation) {
            $('#location-error').hide();
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $.ajax({
                        url: '/get_city_by_coords/',
                        method: 'POST',
                        data: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
                        },
                        success: function(data) {
                            if (data.city) {
                                $('#id_city').val(data.city);
                            } else {
                                $('#location-error').text('Не удалось определить город').show();
                            }
                        },
                        error: function() {
                            $('#location-error').text('Ошибка сервера при определении города').show();
                        }
                    });
                },
                function(error) {
                    let errorMessage;
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Доступ к геолокации запрещен";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Информация о местоположении недоступна";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Время ожидания истекло";
                            break;
                        default:
                            errorMessage = "Произошла неизвестная ошибка";
                    }
                    $('#location-error').text(errorMessage).show();
                }
            );
        } else {
            $('#location-error').text("Геолокация не поддерживается вашим браузером").show();
        }
    });
});