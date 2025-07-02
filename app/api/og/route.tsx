import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Made with Make';
    const subtitle = searchParams.get('subtitle') || 'Automation Subscriptions for Busy Founders';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '60px 80px',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              opacity: 0.3,
            }}
          />

          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <svg width="80" height="70" viewBox="0 0 539 468" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z" fill="black"/>
            </svg>
            <span
              style={{
                fontSize: '32px',
                fontWeight: '600',
                color: 'black',
                marginLeft: '16px',
                fontFamily: 'system-ui',
              }}
            >
              Made with Make
            </span>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '600',
              color: 'black',
              textAlign: 'center',
              lineHeight: '1.1',
              marginBottom: '24px',
              maxWidth: '900px',
              fontFamily: 'system-ui',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: '#6b7280',
              textAlign: 'center',
              lineHeight: '1.4',
              maxWidth: '800px',
              fontFamily: 'system-ui',
            }}
          >
            {subtitle}
          </div>

          {/* Bottom Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '8px',
              background: 'linear-gradient(90deg, #000000 0%, #374151 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 