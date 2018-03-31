#include "turbo.h"

namespace TURBO
{
    Uint32 Settings::SDL_INIT_FLAGS = SDL_INIT_EVERYTHING;
    Uint32 Settings::IMG_INIT_FLAGS = IMG_INIT_PNG;
    Uint32 Settings::MIX_INIT_FLAGS = MIX_INIT_MP3;

    Uint8 Settings::TURBO_FRAME_LIMIT = 60;

    Turbo::Turbo()
        : sdl(Settings::SDL_INIT_FLAGS),
          frame_limit(Settings::TURBO_FRAME_LIMIT)
    {
        sdl.initIMG(Settings::IMG_INIT_FLAGS);
        sdl.initMIX(Settings::MIX_INIT_FLAGS);
    }

    void Turbo::setFrameLimit(Uint8 limit)
    {
        frame_limit = limit;
    }

    Uint8 Turbo::getFrameLimit()
    {
        return frame_limit;
    }

    int Turbo::run()
    {
        SDL_Event event = {};
        VIDEO::Window win("Test", MATH::Rect(0, 0, 500, 500), SDL_WINDOW_SHOWN);
        VIDEO::Renderer ren(win, -1, SDL_RENDERER_ACCELERATED);
        GUI::MainWidget widget = GUI::MainWidget(win, ren);

        while(SYSTEM::SYSTEM_RUNNING)
        {
            while(SDL_PollEvent(&event))
            {
                INPUT::Keyboard::pollEvent(event);
                INPUT::Mouse::pollEvent(event);
                widget.pollEvent(event);

                if(INPUT::Keyboard::pressed(SDLK_ESCAPE, KMOD_LSHIFT))
                {
                    SYSTEM::SYSTEM_RUNNING = false;
                }
                ren.clear();
                widget.draw(&ren);
                ren.present();
            }
        }
        return 0;
    }

    void Turbo::quit()
    {
        TURBO::SYSTEM::SYSTEM_RUNNING = false;
    }
}