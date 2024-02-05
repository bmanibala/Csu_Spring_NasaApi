# Csu_Spring_NasaApi

SpringNasa Api

This Spring Boot application is designed to interact with NASA's Astronomy Picture of the Day (APOD) API. 
It enables users to retrieve APOD (Astronomy Picture of the Day) data based on parameters such as date, start date, end date, count, and thumbs.


Project Structure

The project is organized into several packages, each serving a distinct role within the application:

com.example.SpringNasaApi: The root package containing the main application class.
com.example.SpringNasaApi.controller: Contains the REST controller that handles incoming HTTP requests.
com.example.SpringNasaApi.dto: Contains the Data Transfer Object (DTO) used to model the APOD response.
com.example.SpringNasaApi.service: Contains the service class that handles the logic for fetching data from the NASA APOD API.

Key Classes and Files

SpringNasaApiApplication.java: The main class that runs the Spring Boot application.
NasaController.java: A REST controller class that defines endpoints for interacting with the NASA APOD API.
APODResponse.java: A DTO class that models the response received from the NASA APOD API.
NasaService.java: A service class that contains the logic to call the NASA APOD API and process the response.


NasaController

This class is a REST controller that handles HTTP requests to the /apod endpoint. It uses the @RestController annotation, indicating that it's a controller where every method returns a domain object instead of a view. It's designed to handle the web requests for fetching APOD data.

         @RestController
public class NasaController {

    private final NasaService nasaService;

    
    @Autowired
    public NasaController(NasaService nasaService) {
        this.nasaService = nasaService;
    }

    @GetMapping("/apod")
    public List<APODResponse> getAPOD(@RequestParam(required = false) String date,
                                @RequestParam(required = false) String start_date,
                                @RequestParam(required = false) String end_date,
                                @RequestParam(required = false) Integer count,
                                @RequestParam(required = false) Boolean thumbs) {
        return nasaService.getAPOD(date, start_date, end_date, count, thumbs);
    }
}

APODResponse

This class serves as a Data Transfer Object (DTO) for the APOD data. It defines the structure of the data that the application will send to and receive from clients. It includes fields for date, explanation, url, title, mediaType, and thumbnailUrl, along with their getters and setters.

public class APODResponse {
    private String date;
    private String explanation;
    private String url;
    private String title;
    private String mediaType; 
    private String thumbnailUrl; 

    // Constructor
    public APODResponse() {
    }

    // Getters and Setters
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }
}

NasaService

This class is annotated with @Service, indicating it's a Spring-managed service class. 
It is  responsible for the business logic to fetch APOD data from NASA's APOD API.

@Service
public class NasaService {
    @Value("${nasa.api.key}")
    private String apiKey;

    private static final String NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

    public List<APODResponse> getAPOD(String date, String start_date, String end_date, Integer count, Boolean thumbs) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(NASA_APOD_URL)
                .queryParam("api_key", apiKey)
                .queryParam("date", date)
                .queryParam("start_date", start_date)
                .queryParam("end_date", end_date)
                .queryParam("count", count)
                .queryParam("thumbs", thumbs);

        String url = uriBuilder.toUriString();

        // Attempt to fetch as a list first
        try {
            ResponseEntity<List<APODResponse>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<APODResponse>>() {}
            );
            return responseEntity.getBody();
        } catch (Exception e) {
            // Fallback for single object response
            try {
                APODResponse singleResponse = restTemplate.getForObject(url, APODResponse.class);
                return Collections.singletonList(singleResponse);
            } catch (Exception ex) {
                // Handle the error appropriately
                throw new RuntimeException("Error fetching APOD data: " + ex.getMessage(), ex);
            }
        }
    }
}

SpringNasaApiApplication

This is the entry point of the Spring Boot application. 
It contains the main method that launches the application using SpringApplication.run

@SpringBootApplication
public class SpringNasaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringNasaApiApplication.class, args);
	}

}

application.properties:

nasa.api.key=jlIBnISC6isURflerWnHJRAxHLvNTmCmzPFYL4To
server.port=8080

API Usage:

Once the application is running, you can interact with the NASA APOD API through the provided endpoint:

Get Astronomy Picture of the Day
URL: http://localhost:8080/apod

Method: GET


Parameters:

date: The date of the APOD to fetch (format: YYYY-MM-DD). 
start_date: The start date of a date range to fetch APODs. 
end_date: The end date of a date range to fetch APODs. 
count: The number of random APODs to fetch. 
thumbs: Whether to include thumbnail URLs for video media types. 

Example URLs
 date  :- http://localhost:8080/apod?date=2024-02-04
<img width="756" alt="Screenshot 2024-02-04 152957" src="https://github.com/bmanibala/Csu_Spring_NasaApi/assets/96670639/d2b185aa-5059-4d04-9eb2-de3327006134">

count:-    http://localhost:8080/apod?count=2
<img width="801" alt="Screenshot 2024-02-04 153024" src="https://github.com/bmanibala/Csu_Spring_NasaApi/assets/96670639/04d60c4e-e785-42c4-bb1b-01ea113b175c">

start_date and end_date  http://localhost:8080/apod?start_date=2024-01-01&end_date=2024-01-10
<img width="782" alt="Screenshot 2024-02-04 153319" src="https://github.com/bmanibala/Csu_Spring_NasaApi/assets/96670639/305a0541-cc4b-4fad-a094-bf071876101c">













