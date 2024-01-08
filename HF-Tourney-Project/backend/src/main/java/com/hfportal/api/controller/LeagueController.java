package com.hfportal.api.controller;

import com.hfportal.api.model.League;
import com.hfportal.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/league")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    // READ: Get all Leagues
    @GetMapping
    public List<League> getAllLeagues() {
        return leagueService.findAllLeagues();
    }

    // CREATE: Add a new League
    @PostMapping
    public League addLeague(@RequestBody League league) {
        return leagueService.addLeague(league);
    }

    // READ: Get a specific League by ID
    @GetMapping("/{id}")
    public ResponseEntity<League> getLeagueById(@PathVariable int id) {
        Optional<League> league = leagueService.findLeagueById(id);
        if (league.isPresent()) {
            return ResponseEntity.ok(league.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE: Modify an existing League
    @PutMapping("/{id}")
    public ResponseEntity<League> updateLeague(@PathVariable int id, @RequestBody League updatedLeague) {
        if (id != updatedLeague.getId()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            League league = leagueService.updateLeague(updatedLeague);
            return ResponseEntity.ok(league);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Remove a League by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeague(@PathVariable int id) {
        try {
            leagueService.deleteLeague(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
