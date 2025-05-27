import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function TheologicalComparison() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("eschatology");
  const [selectedView1, setSelectedView1] = useState("amillennialism");
  const [selectedView2, setSelectedView2] = useState("premillennialism");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample theological positions
  const eschatologicalViews = {
    amillennialism: {
      title: "Amillennialism (Church of God, Anderson)",
      summary: "Amillennialism in the Church of God (Anderson, Indiana) tradition teaches that the thousand-year reign in Revelation 20 is symbolic, representing the present church age. Christ is currently reigning spiritually through His church, and believers are already participating in the 'first resurrection' through spiritual rebirth. The Church of God movement emphasizes a present kingdom theology where God's kingdom is manifested now through the church.",
      keyProponents: ["Daniel S. Warner", "H.M. Riggle", "F.G. Smith", "Gilbert Stafford", "Barry Callen"],
      keyScriptures: ["Revelation 20:1-6", "Matthew 12:28-29", "John 5:24-29", "1 Corinthians 15:22-26", "Ephesians 2:4-6"],
      keyBeliefs: [
        "The millennium is symbolic and refers to the present church age",
        "Christ is currently reigning through His church, which is unified and holy",
        "The kingdom of God is already established but not yet fully realized",
        "The 'first resurrection' is spiritual regeneration of believers",
        "Christ will return once (not twice) at the end of the age",
        "The church is called to be one visible body reflecting God's kingdom now"
      ],
      denominations: ["Church of God (Anderson, Indiana)", "Many holiness movements", "Reformed churches", "Lutheran churches", "Many Anglican churches"],
      historicalDevelopment: "While amillennialism traces to Augustine (4th-5th centuries), the Church of God movement, founded in the late 19th century by Daniel S. Warner, embraced amillennial eschatology as part of its emphasis on the present reality of God's kingdom, church unity, and holiness. This aligned with the movement's restorationist vision of the church as already manifesting God's kingdom on earth."
    },
    premillennialism: {
      title: "Premillennialism",
      summary: "Premillennialism teaches that Christ will return to earth before (pre-) His millennial kingdom. After a seven-year tribulation period, Christ will establish a literal thousand-year reign on earth before the final judgment.",
      keyProponents: ["Justin Martyr", "Irenaeus", "John Nelson Darby", "C.I. Scofield", "John MacArthur"],
      keyScriptures: ["Revelation 20:1-6", "Isaiah 65:17-25", "Zechariah 14:5-17", "Matthew 24:29-31"],
      keyBeliefs: [
        "Christ will return physically before the millennium",
        "The millennium will be a literal 1,000-year reign on earth",
        "There will be a seven-year tribulation period before Christ's return",
        "Israel and the Church are distinct entities with different promises",
        "Two physical resurrections: one before the millennium, one after"
      ],
      denominations: ["Many Baptist churches", "Pentecostal churches", "Bible churches", "Many non-denominational churches"],
      historicalDevelopment: "Premillennialism was common in the early church but declined after Augustine. It saw a revival in the 19th century with dispensationalism and has been popular in evangelical circles since."
    },
    postmillennialism: {
      title: "Postmillennialism",
      summary: "Postmillennialism teaches that Christ will return after (post-) the millennium. The millennium is not necessarily a literal thousand years, but a long period during which Christian influence gradually transforms the world, leading to a golden age of spiritual prosperity.",
      keyProponents: ["Jonathan Edwards", "Charles Hodge", "B.B. Warfield", "Loraine Boettner", "Kenneth Gentry"],
      keyScriptures: ["Psalm 72", "Isaiah 2:2-4", "Matthew 13:31-33", "Matthew 28:18-20"],
      keyBeliefs: [
        "The world will be increasingly Christianized through the spread of the gospel",
        "The millennium is a golden age of spiritual prosperity, not necessarily 1,000 years",
        "Christ will return after this golden age",
        "The church is the means God uses to bring about this kingdom on earth",
        "Evil is gradually reduced through Christian influence"
      ],
      denominations: ["Some Presbyterian churches", "Some Reformed churches", "Reconstructionists", "Some Charismatic churches"],
      historicalDevelopment: "Postmillennialism gained prominence in the 17th and 18th centuries during the Great Awakening and was popular until World War I. It has experienced some resurgence in recent decades."
    },
    judaism: {
      title: "Jewish Eschatology",
      summary: "Traditional Jewish eschatology focuses on the coming of the Messiah who will usher in the Olam Ha-Ba (World to Come), restore Israel, rebuild the Temple in Jerusalem, and establish universal knowledge of God. Multiple streams exist, with Orthodox Judaism maintaining a more literal expectation of messianic restoration.",
      keyProponents: ["Maimonides", "Rashi", "Saadia Gaon", "Abraham Isaac Kook", "Joseph Soloveitchik"],
      keyScriptures: ["Isaiah 2:1-4", "Isaiah 11:1-9", "Ezekiel 37", "Zechariah 8:20-23", "Daniel 12", "Malachi 4:5-6"],
      keyBeliefs: [
        "The Messiah (Mashiach) will be a human descendant of King David, not divine",
        "The Messiah will restore Israel politically and spiritually (Kibbutz Galuyot - ingathering of exiles)",
        "The Temple (Beit HaMikdash) will be rebuilt in Jerusalem",
        "There will be universal peace (Tikkun Olam) and knowledge of God",
        "The resurrection of the dead (Techiyat HaMetim) will occur",
        "The Jewish people will be gathered from exile to their homeland"
      ],
      denominations: ["Orthodox Judaism", "Conservative Judaism", "Reform Judaism", "Reconstructionist Judaism", "Hasidic Judaism"],
      historicalDevelopment: "Jewish Messianic expectations developed through biblical times, Talmudic period, and medieval codification (particularly by Maimonides in his 13 Principles). Different interpretations evolved through centuries of diaspora experience, with modern Zionism offering a secular-political interpretation of messianic ideas. Today, views range from literal expectation of a personal Messiah (Orthodox) to symbolic understanding of a messianic age (Reform)."
    },
    
    cogsoteriological: {
      title: "Church of God (Anderson) Soteriology",
      summary: "The Church of God (Anderson, Indiana) embraces a Wesleyan-Arminian understanding of salvation that emphasizes free will, prevenient grace, and entire sanctification. The movement rejects both Calvinistic predestination and once-saved-always-saved doctrines, emphasizing instead a salvation that can be accepted or rejected and the possibility of holy living in this present age.",
      keyProponents: ["Daniel S. Warner", "H.M. Riggle", "F.G. Smith", "John W.V. Smith", "Gilbert Stafford"],
      keyScriptures: ["Hebrews 12:14", "1 Thessalonians 5:23", "Romans 12:1-2", "1 John 1:7", "Acts 2:38-39"],
      keyBeliefs: [
        "Salvation is available to all through Christ's atonement (universal, not limited)",
        "Humans have genuine free will to accept or reject salvation",
        "Justification by faith is followed by entire sanctification as a second work of grace",
        "Believers can experience holiness and Christlikeness in this present life",
        "The indwelling Holy Spirit empowers holy living and unity",
        "Salvation can be lost through willful, persistent sin"
      ],
      denominations: ["Church of God (Anderson, Indiana)", "Other Wesleyan-Holiness bodies", "Free Methodist Church", "Nazarene Church"],
      historicalDevelopment: "Emerging from the American Holiness Movement of the late 19th century, the Church of God (Anderson) developed its soteriology as part of a broader restoration movement. Founder Daniel S. Warner emphasized both personal holiness and visible Christian unity as essential characteristics of the true church. The movement rejected denominational divisions while maintaining core Wesleyan teachings on salvation, sanctification, and the possibility of apostasy."
    },
    
    cogecclesiological: {
      title: "Church of God (Anderson) Ecclesiology",
      summary: "Church of God (Anderson) ecclesiology centers on the concept of the church as the visible, unified body of Christ, transcending denominational boundaries. The movement began as an anti-sectarian, restorationist effort calling Christians out of denominationalism into one holy church defined by spiritual regeneration rather than formal membership.",
      keyProponents: ["Daniel S. Warner", "C.E. Brown", "John W.V. Smith", "Barry Callen", "Merle Strege"],
      keyScriptures: ["John 17:20-23", "Ephesians 4:4-6", "1 Corinthians 1:10-13", "Ephesians 5:25-27", "Revelation 18:4"],
      keyBeliefs: [
        "The church is one unified body, not a collection of denominations",
        "The true church consists of all born-again believers",
        "Church membership is recorded in heaven, not in earthly registers",
        "The Holy Spirit provides governance through gifted leadership",
        "Unity is based on essential Christian truths, with liberty in non-essentials",
        "The church should be visibly united as a witness to the world"
      ],
      denominations: ["Church of God (Anderson, Indiana)"],
      historicalDevelopment: "The Church of God reformation movement emerged in 1880 when Daniel S. Warner and others left denominational structures in pursuit of a visible, unified church. Early leaders interpreted Revelation 18:4 ('Come out of her, my people') as a divine call to leave sectarianism. While initially rejecting any denominational identity, the movement gradually developed organizational structures while maintaining its distinctive emphasis on spiritual unity over institutional membership."
    },
    
    cogpneumatological: {
      title: "Church of God (Anderson) Pneumatology",
      summary: "The Church of God (Anderson) holds a robust pneumatology that emphasizes the Holy Spirit's role in conversion, sanctification, and empowerment for service. While sharing some elements with Pentecostal theology, the movement's view of Spirit baptism is tied primarily to sanctification rather than speaking in tongues.",
      keyProponents: ["Daniel S. Warner", "H.M. Riggle", "F.G. Smith", "Gilbert Stafford", "Barry Callen"],
      keyScriptures: ["Acts 2:1-4", "Romans 8:14-16", "Galatians 5:22-23", "1 Thessalonians 5:23", "1 Corinthians 12:4-11"],
      keyBeliefs: [
        "The Holy Spirit is a person of the Trinity, fully divine",
        "Spirit baptism is associated with sanctification as a second work of grace",
        "The Holy Spirit produces the fruit of the Spirit in believers' lives",
        "Spiritual gifts are distributed among believers for ministry",
        "The Holy Spirit guides the church corporately through gifted leadership",
        "The Holy Spirit's witness provides assurance of salvation"
      ],
      denominations: ["Church of God (Anderson, Indiana)", "Other Wesleyan-Holiness bodies"],
      historicalDevelopment: "The Church of God movement's pneumatology emerged from the 19th century Holiness Movement, emphasizing the sanctifying work of the Spirit. While sharing the Wesleyan emphasis on a second work of grace, the movement did not embrace Pentecostal doctrines of tongues as the initial evidence of Spirit baptism when the Pentecostal movement emerged in the early 20th century. Instead, it maintained a focus on the Spirit's role in heart purity and practical holiness."
    }
  };
  
  // Function to compare theological positions
  const compareViews = (view1: string, view2: string) => {
    const position1 = eschatologicalViews[view1 as keyof typeof eschatologicalViews];
    const position2 = eschatologicalViews[view2 as keyof typeof eschatologicalViews];
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary Comparison</CardTitle>
            <CardDescription>Key differences between {position1.title} and {position2.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg text-slate-800 dark:text-white mb-2">{position1.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{position1.summary}</p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-slate-800 dark:text-white mb-2">{position2.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{position2.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Beliefs</CardTitle>
            <CardDescription>Central theological positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position1.title}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {position1.keyBeliefs.map((belief, index) => (
                      <li key={index} className="text-slate-600 dark:text-slate-300">{belief}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position2.title}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {position2.keyBeliefs.map((belief, index) => (
                      <li key={index} className="text-slate-600 dark:text-slate-300">{belief}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Scriptures</CardTitle>
            <CardDescription>Biblical passages used to support each view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position1.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {position1.keyScriptures.map((scripture, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {scripture}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position2.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {position2.keyScriptures.map((scripture, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium"
                    >
                      {scripture}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Historical Development</CardTitle>
            <CardDescription>Origins and development through church history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position1.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{position1.historicalDevelopment}</p>
                <h4 className="font-medium text-slate-700 dark:text-slate-200 mt-3 mb-1">Key Proponents:</h4>
                <div className="flex flex-wrap gap-2">
                  {position1.keyProponents.map((proponent, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                    >
                      {proponent}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position2.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{position2.historicalDevelopment}</p>
                <h4 className="font-medium text-slate-700 dark:text-slate-200 mt-3 mb-1">Key Proponents:</h4>
                <div className="flex flex-wrap gap-2">
                  {position2.keyProponents.map((proponent, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                    >
                      {proponent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Denominational Alignment</CardTitle>
            <CardDescription>Church bodies that tend to hold these views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position1.title}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {position1.denominations.map((denomination, index) => (
                    <li key={index} className="text-slate-600 dark:text-slate-300">{denomination}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white mb-2">{position2.title}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {position2.denominations.map((denomination, index) => (
                    <li key={index} className="text-slate-600 dark:text-slate-300">{denomination}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Sample other theological topics
  const theologicalTopics = [
    { id: "soteriology", name: "Soteriology (Salvation)" },
    { id: "pneumatology", name: "Pneumatology (Holy Spirit)" },
    { id: "ecclesiology", name: "Ecclesiology (Church)" },
    { id: "christology", name: "Christology (Person of Christ)" },
    { id: "hamartiology", name: "Hamartiology (Sin)" },
    { id: "bibliology", name: "Bibliology (Scripture)" },
  ];

  // Pre-connected Bible software and theological resources
  const bibleResources = [
    { id: "biblegateway", name: "Bible Gateway", status: "Connected - Free Access", image: "https://www.biblegateway.com/favicon.ico" },
    { id: "biblehub", name: "Bible Hub", status: "Connected - Free Access", image: "https://biblehub.com/favicon.ico" },
    { id: "stepbible", name: "STEP Bible", status: "Connected - Free Access", image: "https://www.stepbible.org/images/STEPLogo.png" },
    { id: "blueletterbible", name: "Blue Letter Bible", status: "Connected - Free Access", image: "https://www.blueletterbible.org/favicon.ico" },
    { id: "openbible", name: "Open Bible", status: "Connected - Free Access", image: "https://www.openbible.info/favicon.ico" },
    { id: "bibleref", name: "Bible Reference", status: "Connected - Free Access", image: "https://www.biblestudytools.com/favicon.ico" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Theological Comparison</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          Compare and analyze theological positions, with a focus on amillennial eschatology
        </p>
      </div>
      
      {/* Bible Software Integration Card */}
      <Card className="bg-slate-50 dark:bg-gray-800/50 border-primary-100 dark:border-primary-800/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Bible Software Integration</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                All resources are automatically connected and ready to use
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-full flex items-center text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              All Resources Connected
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {bibleResources.map(resource => (
              <Card key={resource.id} className="bg-white dark:bg-gray-800">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-slate-800 dark:text-white">{resource.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{resource.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Main content with tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 md:w-[600px]">
          <TabsTrigger value="eschatology">Eschatology</TabsTrigger>
          <TabsTrigger value="soteriology">Soteriology</TabsTrigger>
          <TabsTrigger value="ecclesiology">Ecclesiology</TabsTrigger>
          <TabsTrigger value="pneumatology">Pneumatology</TabsTrigger>
        </TabsList>
        
        {/* Eschatology Tab */}
        <TabsContent value="eschatology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compare Eschatological Views</CardTitle>
              <CardDescription>Select positions to compare side by side</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="view1">First Position</Label>
                  <Select value={selectedView1} onValueChange={setSelectedView1}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amillennialism">Church of God (Anderson) Amillennialism</SelectItem>
                      <SelectItem value="cogsoteriological">Church of God (Anderson) Soteriology</SelectItem>
                      <SelectItem value="cogecclesiological">Church of God (Anderson) Ecclesiology</SelectItem>
                      <SelectItem value="cogpneumatological">Church of God (Anderson) Pneumatology</SelectItem>
                      <SelectItem value="premillennialism">Premillennialism</SelectItem>
                      <SelectItem value="postmillennialism">Postmillennialism</SelectItem>
                      <SelectItem value="judaism">Jewish Theology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="view2">Second Position</Label>
                  <Select value={selectedView2} onValueChange={setSelectedView2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amillennialism">Amillennialism</SelectItem>
                      <SelectItem value="premillennialism">Premillennialism</SelectItem>
                      <SelectItem value="postmillennialism">Postmillennialism</SelectItem>
                      <SelectItem value="judaism">Jewish Messianic Expectation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button size="lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  Compare Views
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Comparison Results */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Comparison Results</h2>
            {compareViews(selectedView1, selectedView2)}
          </div>
        </TabsContent>
        
        {/* Other Theology Tabs (placeholder content) */}
        <TabsContent value="soteriology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soteriology (Salvation)</CardTitle>
              <CardDescription>Compare views on salvation, election, and free will</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                This module is in development. It will allow you to compare Calvinist, Arminian, Molinist, and Lutheran views on salvation, predestination, and perseverance.
              </p>
              <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                <h3 className="font-medium text-primary-700 dark:text-primary-300">Coming Soon</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                  We're working on adding detailed comparisons of theological views on salvation, including the doctrines of election, predestination, free will, and assurance of salvation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ecclesiology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ecclesiology (Church)</CardTitle>
              <CardDescription>Compare views on church governance, sacraments, and ministry</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                This module is in development. It will allow you to compare Catholic, Orthodox, Reformed, Baptist, and other denominational views on church structure and function.
              </p>
              <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                <h3 className="font-medium text-primary-700 dark:text-primary-300">Coming Soon</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                  We're working on adding detailed comparisons of ecclesiological positions, including views on church government, the sacraments/ordinances, and the role of clergy and laity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pneumatology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pneumatology (Holy Spirit)</CardTitle>
              <CardDescription>Compare views on the person and work of the Holy Spirit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                This module is in development. It will allow you to compare Cessationist, Continuationist, Pentecostal, and Reformed views on spiritual gifts and the work of the Holy Spirit.
              </p>
              <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                <h3 className="font-medium text-primary-700 dark:text-primary-300">Coming Soon</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                  We're working on adding detailed comparisons of pneumatological positions, including views on the baptism of the Holy Spirit, spiritual gifts, and the role of the Spirit in sanctification.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Amillennial Resources */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Amillennial Resources</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Amillennial Authors and Works</CardTitle>
            <CardDescription>Resources for deeper understanding of amillennial theology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-medium text-slate-800 dark:text-white">Anthony Hoekema</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <span className="font-semibold">The Bible and the Future (1979)</span> - Comprehensive examination of eschatology from a Reformed amillennial perspective.
                </p>
                <Button variant="link" className="px-0 py-1 h-auto text-primary-600 dark:text-primary-400">
                  View Resource Details
                </Button>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-medium text-slate-800 dark:text-white">Kim Riddlebarger</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <span className="font-semibold">A Case for Amillennialism (2013)</span> - Clear exposition of amillennial interpretation, especially focused on Revelation.
                </p>
                <Button variant="link" className="px-0 py-1 h-auto text-primary-600 dark:text-primary-400">
                  View Resource Details
                </Button>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-medium text-slate-800 dark:text-white">Sam Storms</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <span className="font-semibold">Kingdom Come: The Amillennial Alternative (2015)</span> - Former premillennialist presents biblical case for amillennialism.
                </p>
                <Button variant="link" className="px-0 py-1 h-auto text-primary-600 dark:text-primary-400">
                  View Resource Details
                </Button>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-medium text-slate-800 dark:text-white">G.K. Beale</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <span className="font-semibold">The Book of Revelation: A Commentary on the Greek Text (1999)</span> - Scholarly commentary supporting amillennial interpretation.
                </p>
                <Button variant="link" className="px-0 py-1 h-auto text-primary-600 dark:text-primary-400">
                  View Resource Details
                </Button>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-medium text-slate-800 dark:text-white">William Hendriksen</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <span className="font-semibold">More Than Conquerors (1940)</span> - Classic exposition of Revelation from an amillennial perspective.
                </p>
                <Button variant="link" className="px-0 py-1 h-auto text-primary-600 dark:text-primary-400">
                  View Resource Details
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Amillennial Resources</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}