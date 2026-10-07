import re

# 1. Timeline page
with open('src/app/timeline/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    \"const qualiRes = await fetch('https://api.jolpi.ca/ergast/f1/current/1/qualifying.json', { cache: 'no-store' });\",
    \"const qualiRes = await fetch('https://api.jolpi.ca/ergast/f1/current/1/qualifying.json', { next: { revalidate: 3600 } });\"
)

content = content.replace(
    \"const scheduleRes = await fetch('https://api.jolpi.ca/ergast/f1/current.json', { cache: 'no-store' });\",
    \"const scheduleRes = await fetch('https://api.jolpi.ca/ergast/f1/current.json', { next: { revalidate: 3600 } });\"
)

old_block = '''  const completedRacesResponses = await Promise.all(
    completedRacesMeta.map((r: any) => 
      fetch(https://api.jolpi.ca/ergast/f1/current//results.json, { cache: 'no-store' }).then(res => res.json())
    )
  );

  const completedRaces = completedRacesResponses.map(
    res => res.MRData.RaceTable.Races[0]
  ).filter(Boolean);'''

new_block = '''  const completedRaces = [];
  for (const r of completedRacesMeta) {
    const res = await fetch(https://api.jolpi.ca/ergast/f1/current//results.json, { next: { revalidate: 3600 } }).then(res => res.json());
    if (res.MRData.RaceTable.Races[0]) {
      completedRaces.push(res.MRData.RaceTable.Races[0]);
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }'''

content = content.replace(old_block, new_block)

with open('src/app/timeline/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. TimelineChart component
with open('src/components/TimelineChart.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const Y_SPACING = 32;', 'const Y_SPACING = 38;')
content = content.replace('fontSize=\"12\"', 'fontSize=\"11\"')
content = content.replace('fontSize=\"14\"', 'fontSize=\"12\"')
content = content.replace('strokeWidth={isHovered ? 6 : 3}', 'strokeWidth={isHovered ? 5 : 2}')

with open('src/components/TimelineChart.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 3. Navbar component
with open('src/components/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_nav = '''        <Link href=\"/timeline\" className=\"flex items-center gap-2 hover:text-foreground transition-colors\">
          <div className=\"flex flex-col items-center leading-none text-[10px] sm:text-xs\"><span>Mimi\\'s</span><span>Timeline</span></div>
        </Link>'''
new_nav = '''        <Link href=\"/timeline\" className=\"flex items-center gap-2 hover:text-foreground transition-colors\">
          <svg className=\"w-4 h-4 text-f1-red\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M3 3v18h18\"/><path d=\"m19 9-5 5-4-4-3 3\"/></svg>
          <div className=\"flex flex-col items-center leading-none text-[10px] sm:text-xs\"><span>Mimi\\'s</span><span>Timeline</span></div>
        </Link>'''
content = content.replace(old_nav, new_nav)

with open('src/components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 4. DriverSpotlight component
with open('src/components/DriverSpotlight.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_spot = '''        <div className=\"flex justify-center gap-4 text-sm text-text-muted mb-6 font-medium\">
          <span>Active: {activeYears || \"Loading...\"}</span>
          <span>&bull;</span>
          <span>Latest Team: {latestTeam || \"Loading...\"}</span>
        </div>
        <div className=\"grid grid-cols-2 gap-4\">'''
new_spot = '''        <div className=\"flex justify-center gap-4 text-sm text-text-muted mb-6 font-medium\">
          <span>Active: {activeYears || \"Loading...\"}</span>
          <span>&bull;</span>
          <span>Latest Team: {latestTeam || \"Loading...\"}</span>
        </div>
        <p className=\"text-sm text-text-muted mt-4 mb-6 text-center px-4\">
          Known for their exceptional race craft, {driver.name} is a renowned Formula 1 driver who secured {driver.wins} wins and {driver.podiums} podiums throughout their career.
        </p>
        <div className=\"grid grid-cols-2 gap-4\">'''
content = content.replace(old_spot, new_spot)

with open('src/components/DriverSpotlight.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 5. Spotlight page
with open('src/app/spotlight/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('China Grand Prix, 2024', 'China Grand Prix, 2026')

old_tech = '''Banned in 1983 due to safety concerns over cornering speeds and sudden losses of downforce when skirts failed, ground effect made a triumphant return to F1 in the 2022 regulation overhaul. Modern ground effect uses 3D-sculpted Venturi tunnels without sealing skirts, aiming to produce \"cleaner\" wake air and allow cars to follow each other more closely to promote better racing.'''

new_tech = '''Banned in 1983 due to safety concerns over cornering speeds and sudden losses of downforce when skirts failed, ground effect made a triumphant return to F1 in the 2022 regulation overhaul. Modern ground effect uses 3D-sculpted Venturi tunnels without sealing skirts, aiming to produce \"cleaner\" wake air and allow cars to follow each other more closely to promote better racing. To enforce ride height limits and prevent cars from bottoming out dangerously while using ground effect aerodynamics, a \"wooden board\" (the Jabroc skid block/plank) was introduced in 1994.'''

content = content.replace(old_tech, new_tech)

with open('src/app/spotlight/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
