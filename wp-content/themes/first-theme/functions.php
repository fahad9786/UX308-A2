<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style')
    );
    wp_enqueue_script('custom_javascript', get_stylesheet_directory_uri() . '/customElements.js', array(), null, true);
    wp_enqueue_script_module('custom_javascript1', get_stylesheet_directory_uri() . '/Chat.js');
    wp_enqueue_script_module('custom_javascript2', get_stylesheet_directory_uri() . '/Order.js');
}

add_action('wp_footer', 'inject_chat_overlay');
function inject_chat_overlay() {
    echo '
    <style>
        .chat-float-box {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 400px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .chat-float-box.minimized x-chat {
            display: none;
        }
        .chat-float-header {
            background: #c0392b;
            color: #fff;
            padding: 14px 18px;
            font-weight: bold;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            user-select: none;
        }
        .chat-float-header .toggle-icon {
            font-size: 22px;
            line-height: 1;
        }
    </style>

    <div class="chat-float-box" id="darMedinaChat">
        <div class="chat-float-header" onclick="toggleDarMedinaChat()">
            <span>Dar Medina Moroccan Kitchen</span>
            <span class="toggle-icon" id="toggleIcon">&#8211;</span>
        </div>
        <x-chat></x-chat>
    </div>

    <script>
        function toggleDarMedinaChat() {
            var box = document.getElementById("darMedinaChat");
            var icon = document.getElementById("toggleIcon");
            box.classList.toggle("minimized");
            icon.innerHTML = box.classList.contains("minimized") ? "+" : "&#8211;";
        }
    </script>
    ';
}