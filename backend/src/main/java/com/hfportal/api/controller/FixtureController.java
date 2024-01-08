package com.hfportal.api.controller;

import com.hfportal.api.model.Fixture;
import com.hfportal.service.FixtureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fixture")
public class FixtureController {

    @Autowired
    private FixtureService fixtureService;

    // READ: Get all Fixtures
    @GetMapping
    public List<Fixture> getAllFixtures() {
        return fixtureService.findAllFixtures();
    }

    // CREATE: Add a new Fixture
    @PostMapping
    public Fixture addFixture(@RequestBody Fixture fixture) {
        return fixtureService.addFixture(fixture);
    }

    // READ: Get a specific Fixture by ID
    @GetMapping("/{id}")
    public ResponseEntity<Fixture> getFixtureById(@PathVariable int id) {
        Optional<Fixture> fixture = fixtureService.findFixtureById(id);
        if (fixture.isPresent()) {
            return ResponseEntity.ok(fixture.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // READ: GET Fixtures based off LeagueId
    @GetMapping("/by-league/{leagueId}")
    public List<Fixture> getFixturesByLeagueId(@PathVariable int leagueId) {
        return fixtureService.findFixturesByLeagueId(leagueId);
    }

    // UPDATE: Modify an existing Fixture
    @PatchMapping("/{id}")
    public ResponseEntity<Fixture> updateFixture(@PathVariable int id, @RequestBody Fixture updatedFixture) {
        if (id != updatedFixture.getId()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Fixture fixture = fixtureService.updateFixture(updatedFixture);
            return ResponseEntity.ok(fixture);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Remove a Fixture by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFixture(@PathVariable int id) {
        try {
            fixtureService.deleteFixture(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
